<style src="../css/profile.css"></style>

<template>
	<div id="app">
		<header class="header header-flex">
			<a class="back-btn-wrap" href="javascript:;" @click="back">
				<i class="back-btn"></i>
			</a>
			<h2 class="title">我</h2>
		</header>
		<div class="profile-wrap">
			<div class="profile">
				<div class="profile-user">
					<img :src="avatar">
					<div>
						<h4 class="profile-username" v-text="nickname"></h4>
						<p class="profile-tail" v-html="tail"></p>
					</div>
				</div>
				<div class="profile-number">
					<div>
						<p v-text="replyCount"></p>
						回复
					</div>
					<div>
						<p v-text="postCount"></p>
						发表
					</div>
					<div>
						<p v-text="score"></p>
						积分
					</div>
				</div>
			</div>
			<ul class="profile-list">
				<li v-for="item of definition">
					<router-link :to="item.path" v-text="item.text"></router-link>
				</li>
			</ul>
			<ul class="profile-list">
				<!-- <li v-text="item" ></li> -->
				<router-link :to="item.path" tag="li" v-for="item of items" v-text="item.text"></router-link>
			</ul>
			<ul class="profile-list">
				<!-- <li class="no-arrow">昵称</li> -->
				<li class="no-arrow" @click="logout">退出当前账号</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {getProfile} from "../api"

	export default {
		//props: ["user"],
		data() {
			return {
				score: 0,
				replyCount: 0,
				postCount: 0,
				items: ["最新发布", "最近回复"],
				items: [
					{
						path: "/recent_topic",
						text: "最近发布"
					},
					{
						path: "/recent_reply",
						text: "最近回复"
					}
				],
				definition: [
					// {
					// 	path: "/",
					// 	text: "昵称"
					// },
					{
						path: "/tail",
						text: "我的小尾巴"
					}
				]
			}
		},
		created() {
			this.getProfile()
		},
		computed: {
			tail() {
				return this.$store.state.tail
			},
			avatar() {
				return this.$store.state.avatar
			},
			nickname() {
				return this.$store.state.nickname
			}
		},
		methods: {
			back() {
				this.$router.go(-1)
			},
			async getProfile() {
				const data = await getProfile(this.nickname)

				this.score = data.data.score
				this.replyCount = data.data.recent_replies.length
				this.postCount = data.data.recent_topics.length

				localStorage.setItem("topic", JSON.stringify(data.data.recent_topics))
				localStorage.setItem("reply", JSON.stringify(data.data.recent_replies))
			},
			logout() {
				localStorage.clear()

				location.href = "/"
			}
		}
	}
</script>