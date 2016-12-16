<style src="../css/message.css"></style>

<template>
	<div>
		<ul class="message-list">
			<li v-for="item of items">
				<div class="item-user-bar">
					<img class="avatar" :src="item.author.avatar_url">
					<div class="item-detail">
						<span class="username" v-text="item.author.loginname"></span>
						<p class="item-time" v-text="item.reply.create_at | timeFormat"></p>
					</div>
				</div>
				<div class="item-content">
					<p class="item-content-title" v-html="item.reply.content"></p>
				</div>
				<div class="item-quote">
					<a :href="'/topic/' + item.topic.id" v-text="item.topic.title"></a>
				</div>
			</li>
		</ul>
		<loading :loading="loading"></loading>
		<div class="no-data" v-if="noData">空空如也( >﹏&lt;。)～</div>
	</div>
</template>

<script>
	import {getMessages} from "../api"
	import {timeFormat} from "../filters"
	import loading from "./loading.vue"

	export default {
		data() {
			return {
				items: [],
				noData: false,
				loading: true,
				user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
			}
		},
		components: {
			loading
		},
		beforeRouteEnter(to, from, next) {
			next((vm) => {
				vm.getMessages()
			})
		},
		filters: {
			timeFormat(value) {
				return timeFormat(value)
			}
		},
		methods: {
			async getMessages() {
				let data = await getMessages(this.user.token)

				this.loading = false

				this.noData = ! data.data.has_read_messages.length
				this.items = data.data.has_read_messages
			}
		}
	}
</script>