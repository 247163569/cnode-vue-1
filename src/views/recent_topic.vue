<style src="../css/recent.css"></style>

<template>
	<div id="app">
		<header class="header">
			<a class="back-btn-wrap" href="javascript:history.go(-1)">
				<i class="back-btn"></i>
			</a>
			<h2 class="title">最近发布</h2>
		</header>
		<ul class="recent-list profile-wrap">
			<li class="recent-item" v-for="item of list">
				<div>
					<img :src="item.author.avatar_url">
					<div>
						<span class="username" v-text="item.author.loginname"></span>
						<p class="item-time">
							最后回复：
							{{item.last_reply_at | timeFormat}}
						</p>
					</div>
				</div>
				<p v-text="item.title"></p>
			</li>
		</ul>
	</div>
</template>

<script>
	import {timeFormat} from "../filters"

	export default {
		data() {
			return {
				list: []
			}
		},
		filters: {
			timeFormat(value) {
				return timeFormat(value)
			}
		},
		created() {
			this.getMessages()
		},
		methods: {
			getMessages() {
				this.list = JSON.parse(localStorage.getItem("topic"))
			}
		}
	}
</script>