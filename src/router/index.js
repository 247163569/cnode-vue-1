import Home from "../views/home.vue"
import Topic from "../views/topic.vue"
import Login from "../views/login.vue"
import Message from "../views/message.vue"
//import MessageDefault from "../components/message-default.vue"
//import Read from "../components/read.vue"
//import Unread from "../components/unread.vue"
import Post from "../views/post.vue"
import Tail from "../views/tail.vue"
import About from "../views/about.vue"

import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const mode = "history"
const base = "/cnode"
const routes = [
	{
		path: "/",
		component: Home
		// beforeEnter: (to, from, next) => {
		// 	if (! localStorage.getItem("userID")) {
		// 		next("/login")
		// 	} else {
		// 		next()
		// 	}
		// }
	},
	{
		path: "/topic/:topicId",
		component: Topic
	},
	{
		path: "/login",
		component: Login
	},
	{
		path: "/message",
		component: Message
	},
	{
		path: "/post",
		component: Post
	},
	{
		path: "/tail",
		component: Tail
	},
	{
		path: "/about",
		component: About
	},
	{
		path: "*",
		redirect: "/"
	}
]

export default new VueRouter({
	mode,
	base,
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}

		if (to.hash) {
			return {
				selector: to.hash
			}
		}

		return {
			y: 0
		}
	}
})