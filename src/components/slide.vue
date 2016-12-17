<template>
	<section class="slide-nav-wrap">
		<div class="slide-nav">
			<div class="user" @click="goLogin" v-if="! avatar">
				<span class="user-avatar-no"></span>
				<span>登录</span>
			</div>
			<div class="user" v-else @click="profile">
				<img :src="avatar">
				<span v-text="nickname"></span>
			</div>
			<ul class="tag-list">
				<li v-for="(tag, index) of tags" v-text="tag" @click="switchTag(index)"></li>
			</ul>
			<ul class="other-list">
				<li v-for="(item, index) of items">
					<span v-text="item" @click="goOther(index)" v-if="index !== 1"></span>
					<span v-text="item" @click="goOther(index)" :data-count="count" v-if="index === 1"></span>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
	import {getMessageCount} from "../api"

	export default {
		props: ["show"],
		data() {
			return {
				count: "",
				items: ["设置尾巴", "关于"],
				tags: ["全部", "精华", "分享", "问答", "招聘"],
				other: ["/tail", "/about"]
				//user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
			}
		},
		created() {
			//避免多次请求接口
			if (this.$root.requestMessage) {
				return
			}

			//this.user.token && this.getMessageCount()

			this.$root.requestMessage = true
		},
		computed: {
			avatar() {
				return this.$store.state.avatar
			},
			nickname() {
				return this.$store.state.nickname
			}
		},
		methods: {
			goLogin() {
				this.$emit("hideSlideNav")

				this.$router.push("/login")
			},
			profile() {
				this.$router.push("/profile")
			},
			switchTag(index) {
				this.$emit("hideSlideNav")

				this.$emit("switchTag", index)
			},
			goOther(index) {
				this.$emit("hideSlideNav")

				this.$router.push(this.other[index])
			}
		}
	}
</script>