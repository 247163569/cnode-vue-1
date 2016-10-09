import Home from "./views/home.vue"
import Topic from "./views/topic.vue"
import Login from "./views/login.vue"
import Message from "./views/message.vue"
import MessageDefault from "./components/message-default.vue"
import Read from "./components/read.vue"
import Unread from "./components/unread.vue"
import Post from "./views/post.vue"
import Tail from "./views/tail.vue"
import About from "./views/about.vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

var router = new VueRouter({
	root:"/cnode",
	history: true
})

// router.map({
// 	"/": {
// 		name: "home",
// 		component: (resolve) => require(["./components/home.vue"], resolve)
// 	},
// 	"/topic/:topicId": {
// 		name: "topic",
// 		component: (resolve) => require(["./components/topic.vue"], resolve)
// 	},
// 	"/login": {
// 		name: "login",
// 		component: (resolve) => require(["./components/login.vue"], resolve)
// 	},
// 	"/message": {
// 		name: "message",
// 		component: (resolve) => require(["./components/message.vue"], resolve)
// 	},
// 	"/post": {
// 		name: "post",
// 		component: (resolve) => require(["./components/post.vue"], resolve)
// 	},
// 	"/profile/:username": {
// 		name: "profile",
// 		component: (resolve) => require(["./components/profile.vue"], resolve)
// 	}
// })

router.map({
	"/": {
		component: Home
	},
	"/topic/:topicId": {
		component: Topic
	},
	"/login": {
		component: Login
	},
	"/message": {
		component: Message,
		subRoutes: {
			"/": {
				component: MessageDefault
			},
			"/read": {
				component: Read
			},
			"/unread": {
				component: Unread
			}
		}
	},
	"/post": {
		component: Post
	},
	"/tail": {
		component: Tail
	},
	"/about": {
		component: About
	}
})

router.redirect({
	"*": "/"
})

export default router