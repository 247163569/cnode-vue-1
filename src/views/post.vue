<style src="../css/post.css"></style>

<template>
	<div id="app">
		<header class="header">
			<router-link to="/" class="back-btn-wrap post-btn-wrap">
				<i class="back-btn"></i>
			</router-link>
			<h1 class="title">发表</h1>
			<a class="go-post-btn" href="javascript:;" :class="{active: postStatus}" @click="post" v-if="postStatus">发布</a>
			<a class="go-post-btn" href="javascript:;" v-else>发布</a>
		</header>
		<ul class="post-list">
			<li class="post-item">
				<input type="text" placeholder="输入主题标题" v-model="title" />
			</li>
			<li class="post-item tag-item" :data-tag="tag" @click="selectTag">选择一个标签</li>
		</ul>
		<div class="post-container">
			<textarea class="post-content" placeholder="这一刻的想法..." v-model="content" @keyup.enter="toPost"></textarea>
			<p v-if="count">
				已输入
				<span v-text="count"></span>
				字
			</p>
		</div>
		<transition name="select">
			<div class="select-tag" v-if="show" @click="show = false">
				<ul @click.stop>
					<li v-for="tag of tags" v-text="tag" @click="hideTag(tag)"></li>
					<li @click="show = false">取消</li>
				</ul>
			</div>
		</transition>
		<tips :message="message" @cancelMessage="message = ''"></tips>
	</div>
</template>

<script>
	import {post} from "../api"
	import {ISOTimeFormat} from "../filters"
	import tips from "../components/tips.vue"

	export default {
		data() {
			return {
				title: "",
				tag: "问答",
				content: "",
				count: 0,
				show: false,
				message: "",
				tags: ["问答", "分享", "招聘"],
				user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
			}
		},
		computed: {
			postStatus() {
				return !! this.title && !! this.content
			}
		},
		components: {
			tips
		},
		methods: {
			selectTag() {
				this.show = true
			},
			hideTag(tag) {
				this.show = false

				this.tag = tag
			},
			toPost(e) {
				if (! e.ctrlKey) {
					return
				}

				this.post()
			},
			async post() {
				if (! this.title || ! this.content) {
					return
				}

				if (this.title.length < 10) {
					//this.$dispatch("tailChanged", "标题太少啊 要够10个字啊")
					this.message = "标题至少需要10个字"

					return
				}

				let tags = {
					问答: "ask",
					分享: "share",
					招聘: "job"
				}

				let topicData = {
					author: {
						loginname: this.$store.state.nickname,
						avatar_url: this.$store.state.avatar
					},
					content: '<div class="markdown-text"></div>',
					create_at: ISOTimeFormat(Date.now()),
					good: false,
					id: "",
					reply_count: 0,
					tab: tags[this.tag],
					title: this.title,
					top: false,
					visit_count: 0
				}

				let data = await post({
					token: this.$store.state.accesstoken,
					title: this.title,
					tab: tags[this.tag],
					content: this.content
				})

				if (data.success) {
					// 本地保存
					// let index = 0
					// let list = JSON.parse(localStorage.getItem("list"))

					// for (let {top} of list) {
					// 	if (! top) {
					// 		break
					// 	}

					// 	index++
					// }

					// topicData.id = data.topic_id

					// list.splice(index, 0, topicData)

					// localStorage.setItem("list", JSON.stringify(list))

					// 跳转
					this.$router.push("/")
				}
			}
		}
	}
</script>