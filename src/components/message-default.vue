<template>
	<ul class="message-list-default">
		<li class="mg-item" v-for="(item, index) of items">
			<router-link class="mg-item-link" :to="index === 0 ? '/message/unread' : '/message/read'" v-text="item"></router-link>
			<span class="arrow"></span>
		</li>
	</ul>
</template>

<script>
	export default {
		data() {
			return {
				items: ["未读消息", "已读消息"]
			}
		}
	}
</script>