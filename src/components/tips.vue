<template>
	<transition name="tips">
		<div class="tips-wrap" v-if="message">
			<div class="tips" v-text="message"></div>
		</div>
	</transition>
</template>

<script>
	export default {
		props: ["message"],
		watch: {
			message() {
				clearTimeout(this.timer)

				this.timer = setTimeout(() => {
					this.$emit("cancelMessage")
				}, 2000)
			}
		}
	}
</script>