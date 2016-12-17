<style src="../css/about.css"></style>

<template>
	<div id="app">
		<header class="header topic-hd">
			<router-link to="/" class="back-btn-wrap">
				<i class="back-btn"></i>
			</router-link>
			<h2 class="title">关于</h2>
		</header>
		<ul class="about-list">
			<li v-for="item in items">
				<h5 v-text="item.title"></h5>
				<p v-html="item.content"></p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				items: [
					{
						title: "项目",
						content: "本项目是基于 cnode.org 社区的API 采用 Vue.js 构建的 Webapp"
					},
					{
						title: "项目地址",
						content: "<a href='https://github.com/ihanyang/cnode-vue'>https://github.com/ihanyang/cnode-vue</a>"
					},
					{
						title: "Issues",
						content: "<a href='https://github.com/ihanyang/cnode-vue/issues'>https://github.com/ihanyang/cnode-vue/issues</a>"
					},
					{
						title: "当前进度",
						content: "已完成"
					},
				]
			}
		}
	}
</script>