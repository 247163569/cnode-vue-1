<template>
	<transition name="loading">
		<div class="loading-cover" v-if="loading">
			<div class="loading-text">(´・ω・｀)正在加载...</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props: ["loading"]
	}
</script>