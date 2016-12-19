<template>
	<div id="app" :class="{show: show}">
		<header class="header header-flex" v-on:dblclick="backTop">
			<div class="side-btn-wrap" @click="showSlideNav">
				<div class="side-btn"></div>
			</div>
			<h1 class="title" v-text="tagText"></h1>
			<!-- <router-link to="/post" class="post-btn">发表</router-link> -->
			<router-link to="/message" class="post-btn" :class="{'appear-message': appearMessage, actived: actived}">
				<svg height="16" version="1.1" viewBox="0 0 14 16" width="16">
					<path fill-rule="evenodd" d="M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z"></path>
				</svg>
			</router-link>
		</header>
		<slide :show="show" @hideSlideNav="hideSlideNav" @switchTag="switchTag"></slide>
		<div class="container">
			<ul>
				<li class="item" v-for="item of list" :data-url="item.author.avatar_url" :data-id="item.id">
					<div class="item-user-bar">
						<!-- <img class="avatar" src="../images/loading.png"> -->
						<div class="avatar-cover" :class="{'avatar-loaded': itemss.indexOf(item.id) > -1}" v-if="! item.lazy">
							<transition name="avatar">
								<div class="avatar" :style="{backgroundImage: 'url(' + item.author.avatar_url + ')'}" v-if="itemss.indexOf(item.id) > -1"></div>
							</transition>
						</div>
						<div class="avatar-cover" :class="{'avatar-loaded': itemss.indexOf(item.id) > -1}" v-if="item.lazy">
							<div class="avatar" :style="{backgroundImage: 'url(' + item.author.avatar_url + ')'}" v-if="itemss.indexOf(item.id) > -1"></div>
						</div>
						<div class="item-detail">
							<span class="username" v-text="item.author.loginname"></span>
							<span class="label" v-if="item.top">置顶</span>
							<span class="label" v-if="item.good">精华</span>
							<span class="label">
								{{item.tab | textFormat}}
							</span>
							<p class="item-time">
								{{item.create_at | timeFormat}}
							</p>
						</div>
					</div>
					<div class="item-content">
						<router-link :to="'/topic/' + item.id" class="item-link">
							<p class="item-content-title" v-text="item.title"></p>
						</router-link>
					</div>
					<div class="item-btn-wrap">
						<div class="btn visit-btn">
							<span>
								<i class="iconfont">&#xe69d;</i>
								{{item.visit_count}}
							</span>
						</div>
						<div class="btn reply-btn">
							<router-link :to="'/topic/' + item.id + '#comment'">
								<span>
									<i class="iconfont">&#xf0217;</i>
									{{item.reply_count}}
								</span>
							</router-link>
						</div>
						<div class="btn share_btn" @click="share">
							<i class="iconfont">&#xf01ba;</i>
							分享
						</div>
					</div>
				</li>
			</ul>
			<div class="loading-wrap" v-if="locked">
				<div class="loading-text">(´・ω・｀)正在加载...</div>
			</div>
		</div>
		<loading :loading="loading"></loading>
		<div class="mask" v-if="show" @click="hideSlideNav" @touchmove="touchmove"></div>
		<!-- <div class="back-top" @click="backTop" v-if="scrollTop">
			<i class="iconfont">&#xe758;</i>
		</div> -->
		<router-link to="/post" class="back-top"></router-link>
	</div>
</template>

<script>
	import {getMessageCount, getList} from "../api"
	import {timeFormat} from "../filters"
	import loading from "../components/loading.vue"
	import slide from "../components/slide.vue"

	export default {
		data() {
			return {
				count: 0,
				page: 1,
				//scrollTop: false,
				locked: false,
				loading: true,
				show: false,
				actived: false,
				list: [],
				$items: [],
				itemss: [],
				tags: [
					{
						tag: "all",
						text: "全部"
					},
					{
						tag: "good",
						text: "精华"
					},
					{
						tag: "share",
						text: "分享"
					},
					{
						tag: "ask",
						text: "问答"
					},
					{
						tag: "job",
						text: "招聘"
					}
				],
				tag: localStorage.getItem("tag") ? localStorage.getItem("tag") : "all",
				tagText: localStorage.getItem("tagText") ? localStorage.getItem("tagText") : "全部"
			}
		},
		beforeRouteEnter(to, from, next) {
			next((vm) => {
				vm.getMessageCount()

				window.addEventListener("scroll", vm.scroll, false)
			})
		},
		beforeRouteLeave(to, from, next) {
			this.show = false

			window.removeEventListener("scroll", this.scroll, false)

			next()
		},
		components: {
			slide,
			loading
		},
		computed: {
			appearMessage() {
				return !! this.$store.state.accesstoken
			},
			height() {
				return window.innerHeight + "px"
			}
		},
		filters: {
			timeFormat(value) {
				return timeFormat(value)
			},
			textFormat(value) {
				let str,
					map = {
						share: "分享",
						ask: "问答",
						job: "招聘"
					}

				if (! value) {
					return "暂无"
				}

				str = map[value]

				return str
			}
		},
		methods: {
			async getMessageCount() {
				const data = await getMessageCount(this.$store.state.accesstoken)

				data.data && (this.actived = true)
			},
			async getList() {
				let data = await getList(this.page, this.tag)

				this.list = this.list.concat(data.data)

				this.locked = false
				this.loading = false

				this.forLazy()
			},
			forLazy() {
				this.$nextTick(() => {
					this.$items = Array.from(document.querySelectorAll(".item"), (v) => {
						return {
							item: v,
							url: v.dataset.url,
							position: v.getBoundingClientRect().top
						}
					})

					this.lazy()
				})
			},
			lazy() {
				this.$items =  this.$items.filter((item) => {
					let top = item.item.getBoundingClientRect().top
					let height = item.item.getBoundingClientRect().height

					if (top >= 0 && top <= window.innerHeight + height) {
						let img = new Image()

						img.src = item.url

						img.onload = () => {
							this.itemss.push(item.item.dataset.id)
							item.item.removeAttribute("data-src")
							item.item.removeAttribute("data-id")

							img.onload = null
						}



						return false
					}

					return true
				})

				//console.log(this.$items.length)
			},
			showSlideNav() {
				this.show = true
			},
			hideSlideNav() {
				this.show = false

				document.body.classList.remove("show")
			},
			switchTag(index) {
				this.tag = this.tags[index].tag
				this.tagText = this.tags[index].text

				this.loading = true
				this.page = 1
				this.list = []

				this.getList()

				localStorage.setItem("tag", this.tag)
				localStorage.setItem("tagText", this.tagText)
			},
			touchmove(e) {
				e.preventDefault()
			},
			loadMore() {
				this.page++

				this.getList()
			},
			scroll() {
				this.$items.length && this.lazy()

				//document.body.scrollTop >= 500 && (this.scrollTop = true)

				//document.body.scrollTop < 500 && (this.scrollTop = false)

				// 滚动加载
				if (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) >= 0.7) {
					 if (! this.locked) {
					 	this.locked = true;

					 	this.loadMore()
					 }
				}
			},
			backTop() {
				const scroll = document.scrollingElement || document.body

				scroll.scrollTop = 0
				//requestAnimationFrame(this.backTop)
			},
			share() {
				// alert(navigator.share)
				// navigator.share({
				//     title: document.title,
				//     text: "Hello World",
				//     url: window.location.href
				// }).then(() => alert('Successful share'))
				// .catch(error => alert('Error sharing:', error))
			}
		},
		mounted() {
			this.getList()
		}
	}
</script>