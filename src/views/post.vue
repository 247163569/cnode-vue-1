<style src="../css/post.css"></style>

<template>
	<div id="app">
		<header class="header">
			<router-link to="/" class="back-btn-wrap post-btn-wrap">
				<i class="back-btn"></i>
			</router-link>
			<h1 class="title">创作新主题</h1>
			<a class="go-post-btn" href="javascript:;" :class="{active: postStatus}" @click="post" v-if="postStatus">发布</a>
			<a class="go-post-btn" href="javascript:;" v-else>发布</a>
		</header>
		<ul class="post-list">
			<li class="post-item tag-item" :data-tag="tag" @click="selectTag">选择一个标签</li>
			<li class="post-item">
				<input type="text" placeholder="输入主题标题" v-model="title" />
			</li>
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
				tags: ["问答", "分享", "招聘"]
			}
		},
		computed: {
			postStatus() {
				return !! this.title && this.title.length >= 10 && !! this.content
			}
		},
		components: {
			tips
		},
		beforeRouteLeave(to, from, next) {
			this.tag = "问答"
			this.title = ""
			this.content = ""

			next()
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

				const tags = {
					问答: "ask",
					分享: "share",
					招聘: "job"
				}

				// const topicData = {
				// 	author: {
				// 		loginname: this.$store.state.nickname,
				// 		avatar_url: this.$store.state.avatar
				// 	},
				// 	content: `<div class="markdown-text">${this.content}</div>`,
				// 	create_at: ISOTimeFormat(Date.now()),
				// 	good: false,
				// 	id: "",
				// 	reply_count: 0,
				// 	tab: tags[this.tag],
				// 	title: this.title,
				// 	top: false,
				// 	visit_count: 0
				// }

				const data = await post({
					token: this.$store.state.accesstoken,
					title: this.title,
					tab: tags[this.tag],
					content: this.content
				})

				if (data.success) {
					location.href = "/cnode"
				}

				if (! data.success) {
					this.message = "发布失败，等会再试试吧"
				}
			}
		}
	}
</script>