<template>
	<div id="app">
		<header class="header">
			<router-link to="/" class="back-btn-wrap">
				<i class="back-btn"></i>
			</router-link>
			<h2 class="title">登录</h2>
		</header>
		<div class="box">
			<input class="input-text" type="text" placeholder="Access Token" autofocus v-model="token" @keydown.enter="loginValidate">
			<a class="btn save-btn" href="javascript:;" @click="loginValidate">登录</a>
		</div>
		<tips :message="message" @cancelMessage="message = ''"></tips>
	</div>
</template>

<script>
	import {login} from "../api"
	import tips from "../components/tips.vue"

	export default {
		data() {
			return {
				token: "",
				message: ""
			}
		},
		components: {
			tips
		},
		methods: {
			loginValidate() {
				if (! this.token) {
					return
				}

				this.login()
			},
			async login() {
				const data = await login(this.token)
				const path = this.$route.query.redirect

				if (data.success) {
					// 记录 token
					data.token = this.token

					// 自定义小尾巴
					data.tail = `<p>来自吊吊的 <a href="https://github.com/ihanyang/cnode-vue" target="_blank">cnode-vue</a></p>`

					localStorage.setItem("user", JSON.stringify({
						id: data.id,
						avatar: data.avatar_url,
						nickname: data.loginname,
						accesstoken: data.token,
						tail: data.tail
					}))

					this.$store.commit("tail", data.tail)
					this.$store.commit("avatar", data.avatar_url)
					this.$store.commit("nickname", data.loginname)
					this.$store.commit("accesstoken", data.token)

					//this.$router.push(path)
					path ? this.$router.push(path) : this.$router.go(-1)

					return
				}

				if (! data.success) {
					this.message = data.error_msg
				}
			}
		}
	}
</script>