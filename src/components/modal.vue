<template>
	<div class="modal-mask" v-if="show" transition="modal" @click="close">
		<div class="modal-container">
			<div class="modal-header">
				<h4>登录以继续操作</h4>
				<a href="javasctipt:;" @click="close">
					<i class="iconfont">&#xf01b0;</i>
				</a>
			</div>
			<div class="modal-content">
				<a class="modal-login-btn" href="javascript:;" @click="login">登录</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["show"],
		data() {
			return {

			}
		},
		methods: {
			close() {
				this.show = false
			},
			login() {
				this.$router.push(`/login?redirect=${location.pathname}`)
			}
		}
	}
</script>