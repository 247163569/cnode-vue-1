<template>
	<li class="reply-item">
		<div>
			<a target="_blank" :href="'https://cnodejs.org/user/' + item.author.loginname">
				<img class="avatar" :src="item.author.avatar_url">
			</a>
		</div>
		<slot></slot>
	</li>
</template>

<script>
	import {timeFormat} from "../filters"

	export default {
		props: ["item", "type"],
		data() {
			return {

			}
		},
		filters: {
			timeFormat(value) {
				return timeFormat(value)
			}
		}
	}
</script>