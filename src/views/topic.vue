<style src="../css/topic.css"></style>

<template>
	<div id="app">
		<header class="header">
			<router-link to="/" class="back-btn-wrap">
				<i class="back-btn"></i>
			</router-link>
			<h2 class="title">帖子正文</h2>
		</header>
		<div class="topic-container" v-if="! loading">
			<div class="topic-content">
				<div class="topic-header">
					<h1 class="topic-title" v-text="topic.title"></h1>
					<p>
						<img class="topic-avatar" :src="topic.author.avatar_url">
						<span class="topic-username" v-text="topic.author.loginname"></span>
						<span>·</span>
						<span>
							{{topic.create_at | timeFormat}}
						</span>
						<template v-if="$store.state.avatar">
							<span class="collect" @click="collect" v-if="! isCollect">收藏</span>
							<span class="collect" v-else>已收藏</span>
						</template>
					</p>
				</div>
				<div v-html="topic.content"></div>
			</div>
			<div class="reply">
				<div class="reply-count">
					{{topic.reply_count | textFormat}}
				</div>
				<ul class="reply-list">
					<item v-for="item of topic.replies" :item="item">
					<div>
							<a class="reply-name" target="_blank" :href="'https://cnodejs.org/user/' + item.author.loginname" v-text="item.author.loginname"></a>
							<p class="reply-content" v-html="item.content"></p>
							<p class="reply-ft">
								<span>
									{{item.create_at | timeFormat}}
								</span>
								<template v-if="loginState">
									<template v-if="item.author.loginname !== nickname">
										<span class="reply-btn" @click="subReply(item)">回复</span>
										<span class="like" @click="like(item.id, item)" v-text="item.ups.indexOf(userID) !== -1 ? '取消赞' : '赞'"></span>
										<span class="like-count" v-text="item.ups.length + ' 赞'"></span>
									</template>
									<template v-else>
										<span class="del" @click="del">删除</span>
										<span class="like-count" v-text="item.ups.length + ' 赞'"></span>
									</template>
								</template>
								<template v-else>
									<span class="like" @click="forLike">赞</span>
									<span class="like-count" v-text="item.ups.length + ' 赞'"></span>
								</template>
								<div class="reply-box" v-if="item.replyState">
									<div class="reply-edit-content-wrap">
										<img :src="avatar">
										<input type="text" class="reply-edit-content" placeholder="留下你的评论" v-model="item.replyContent" @keydown.enter="toSubReply(item)">
									</div>
									<div class="reply-edit-btn-wrap">
										<span class="reply-edit-btn" @click="item.replyState = false">取消</span>
										<span class="reply-edit-btn" @click="toSubReply(item)">评论</span>
									</div>
								</div>
							</p>
						</div>
					</item>
				</ul>
				<div class="reply-box reply-box-ft" v-if="loginState">
					<div class="reply-edit-content-wrap">
						<img :src="avatar">
						<input type="text" class="reply-edit-content" placeholder="留下你的评论" v-model="replyContent" @click="replyState = true" @keydown.enter="toReply" ref="commentInput">
					</div>
					<div class="reply-edit-btn-wrap" v-if="replyState">
						<span class="reply-edit-btn" @click="replyState = false">取消</span>
						<span class="reply-edit-btn" @click="toReply">评论</span>
					</div>
				</div>
			</div>
		</div>
		<loading :loading="loading"></loading>
	</div>
</template>

<script>
	import Vue from "vue"
	import {getTopic, like, reply, collect} from "../api"
	import {timeFormat, ISOTimeFormat} from "../filters"
	import loading from "../components/loading.vue"
	import item from "../components/item.vue"
	import {serialize} from "../utils"

	export default {
		data() {
			return {
				loading: true,
				topic: {
					author: {
						loginname: "",
						avatar_url: ""
					},
					replies: []
				},
				//user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
				replyContent: "",
				isCollect: false,
				replyState: false
			}
		},
		components: {
			item,
			loading
		},
		beforeRouteEnter(to, from, next) {
			next((vm) => {
				vm.topic = {
					author: {
						loginname: "",
						avatar_url: ""
					},
					replies: []
				}

				vm.loading = true
				vm.getTopic()
			})
		},
		beforeRouteLeave(to, from, next) {
			document.title = this.$title

			next()
		},
		computed: {
			userID() {
				return localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).id
			},
			loginState() {
				return !! this.$store.state.accesstoken
			},
			avatar() {
				return this.$store.state.avatar
			},
			nickname() {
				return this.$store.state.nickname
			},
			accesstoken() {
				return this.$store.state.accesstoken
			}
		},
		filters: {
			textFormat(value) {
				return `${value}条评论`
			},
			timeFormat(value) {
				return timeFormat(value)
			}
		},
		methods: {
			async getTopic() {
				let data = await getTopic(this.$route.params.topicId)

				this.topic = data.data

				this.isCollect = data.data.is_collect

				this.$title = document.title
				document.title = data.data.title

				this.loading = false
			},
			async like(id, item) {
				let token = this.accesstoken
				let data = await like(id, token)

				if (data.success && data.action === "up") {
					item.ups.push(this.userID)

					return
				}

				if (data.success && data.action === "down") {
					item.ups.splice(item.ups.indexOf(this.userID), 1)

					return
				}

			},
			async collect() {
				const params = {
					accesstoken: this.$store.state.accesstoken,
					topic_id: this.$route.params.topicId
				}
				const data = await collect(serialize(params))

				data.success && (this.isCollect = true)
			},
			toReply() {
				if (! this.replyContent) {
					return
				}

				const tail = JSON.parse(localStorage.getItem("user")).tail
				let content = `${this.replyContent} <br> <br>${tail}`

				this.reply(content)
			},
			toSubReply(item) {
				if (! item.replyContent) {
					return
				}

				let replyName = `<a href="/profile/${item.author.loginname}">@${item.author.loginname}</a>`,
					replyContent = item.replyContent

				let content = `${replyName} ${item.replyContent} <br> <br>${this.user.tail}`

				this.reply(content, item)
			},
			async reply(content, item) {
				let {avatar, nickname, accesstoken} = this.$store.state

				this.topic.replies.push({
					author: {
						loginname: nickname,
						avatar_url: avatar
					},
					create_at: ISOTimeFormat(+ new Date),
					content: `<div class="markdown-text">${content}</div>`,
					ups: []
				})

				if (! item) {
					this.replyContent = ""
					this.replyState = false

					this.$refs.commentInput.blur()

					let data = await reply(accesstoken, this.$route.params.topicId, content)

					return
				}

				item.replyContent = ""
				item.replyState = false

				let data = await reply(accesstoken, this.$route.params.topicId, content, item.id)
			},
			forLike() {
				this.$router.push("/login")
			},
			del() {
				alert("点啥点，点了也木有用~~")
			},
			subReply(item) {
				console.log(item)
				Vue.set(item, "replyState", true)
				Vue.set(item, "replyContent", "")
			}
		}
	}
</script>