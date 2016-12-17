<template>
	<div id="app">
		<header class="header topic-hd">
			<a class="back-btn-wrap" href="javascript:;" @click="back">
				<i class="back-btn"></i>
			</a>
			<h2 class="title">设置尾巴</h2>
		</header>
		<div class="box">
			<input class="input-text" type="text" placeholder="造个尾巴玩玩吧" autofocus v-model="tail" @keydown.enter="resetTail">
			<a class="btn save-btn" href="javascript:;" @click="resetTail">保存</a>
		</div>
		<tips :message="message" @cancelMessage="message = ''"></tips>
	</div>
</template>

<script>
	import tips from "../components/tips.vue"

	export default {
		data() {
			return {
				tail: "",
				message: ""
			}
		},
		route: {
			canActivate(transition) {
				if (! localStorage.getItem("user")) {
					transition.redirect("/login?redirect=/tail")
					return false
				}

				return true
			}
		},
		components: {
			tips
		},
		methods: {
			back() {
				this.$router.go(-1)
			},
			resetTail() {
				if (! this.tail) {
					this.message = "尾巴不能木有啊"

					return
				}

				let user = JSON.parse(localStorage.getItem("user"))

				user.tail = this.tail

				localStorage.setItem("user", JSON.stringify(user))

				this.$store.commit("tail", user.tail)

				this.tail = ""

				//this.$dispatch("tailChanged", "小尾巴修改成功~~")

				this.back()
			}
		}
	}
</script>