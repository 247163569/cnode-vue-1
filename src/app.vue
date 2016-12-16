<template>
	<keep-alive>
		<router-view></router-view>
	</keep-alive>
</template>

<script>
	export default {
		data() {
			return {
				tag: "全部",
				show: false,
				slide: false,
				message: ""
			}
		},
		created() {
			const deviceWidth = Math.min(640, document.documentElement.clientWidth)

			document.documentElement.style.fontSize = `${deviceWidth / 7.5}px`
		},
		events: {
			showNav() {
				this.showNav = true
			},
			hideNav() {
				this.showNav = false
			},
			showSlideNav() {
				this.show = true

				document.body.classList.add("show")
			},
			closeLoading() {
				this.loading = false
			},
			tailChanged(message) {
				this.message = message
			},
			addBgClass() {
				document.body.classList.add("bg")
			},
			removeBgClass() {
				document.body.classList.remove("bg")
			},
			postError(message) {
				this.message = message
			}
		}
	}
</script>