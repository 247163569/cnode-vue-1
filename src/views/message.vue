<style src="../css/message.css"></style>

<template>
	<div id="app">
		<header class="header header-flex">
			<a class="back-btn-wrap" href="javascript:history.go(-1)">
				<i class="back-btn"></i>
			</a>
			<h2 class="title" v-text="type" @click="messageSwitch"></h2>
		</header>
		<ul class="message-list" v-if="! loading">
			<item v-for="item of list" :item="item" type="message">
				<div>
					<router-link :to="'/topic/' + item.topic.id" v-text="item.author.loginname" class="message-name"></router-link>
					<span class="message-time">回复时间：{{item.create_at | timeFormat}}</span>
					<p v-html="item.reply.content"></p>
					<router-link :to="'/topic/' + item.topic.id" v-text="'来自：' + item.topic.title" class="origin"></router-link>
				</div>
			</item>
		</ul>
		<loading :loading="loading"></loading>
		<no-data v-if="noMessage"></no-data>
	</div>
</template>

<script>
	import {getMessages} from "../api"
	import {timeFormat} from "../filters"
	import item from "../components/item.vue"
	import loading from "../components/loading.vue"
	import noData from "../components/no-data.vue"

	export default {
		data() {
			return {
				list: [],
				type: "已读消息",
				loading: true,
				noMessage: false
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
			noData,
			loading
		},
		methods: {
			messageSwitch() {
				this.type = this.type === "已读消息" ? "未读消息" : "已读消息"
				this.list = []

				this.loading = true

				this.getMessages()
			},
			async getMessages() {
				const token = this.$store.state.accesstoken
				const data = await getMessages(token)

				this.list = this.type === "已读消息" ? data.data.has_read_messages : data.data.hasnot_read_messages

				this.loading = false

				this.noMessage = ! this.list.length
			}
		}
	}
</script>