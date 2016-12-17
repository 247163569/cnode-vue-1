<style src="../css/message.css"></style>

<template>
	<div id="app">
		<header class="header">
			<a class="back-btn-wrap" href="javascript:history.go(-1)">
				<i class="back-btn"></i>
			</a>
			<h2 class="title">消息</h2>
		</header>
		<ul class="message-list" v-if="! loading">
			<item v-for="item of list" :item="item" type="message">
				<div>
					<p class="flex">
						<span class="message-name" v-text="item.author.loginname"></span>
						<span class="message-time">{{item.create_at | timeFormat}}</span>
					</p>
					<p v-html="item.reply.content"></p>
					<router-link :to="'/topic/' + item.topic.id" v-text="'来自：' + item.topic.title" class="origin"></router-link>
				</div>
			</item>
		</ul>
		<loading :loading="loading"></loading>
	</div>
</template>

<script>
	import {getMessages} from "../api"
	import {timeFormat} from "../filters"
	import item from "../components/item.vue"
	import loading from "../components/loading.vue"

	export default {
		data() {
			return {
				list: [],
				loading: true
			}
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
		components: {
			item,
			loading
		},
		methods: {
			async getMessages() {
				const token = this.$store.state.accesstoken
				const data = await getMessages(token)

				this.list = data.data.has_read_messages

				this.loading = false
			}
		}
	}
</script>