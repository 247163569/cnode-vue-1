import "./css/normalize.css"
import "./css/common.css"
import "./css/app.css"

import "./css/home.css"
import "./css/topic.css"
import "./css/layout-box.css"
import "./css/message.css"


import Vue from "vue"
import router from "./router"
import App from "./app.vue"
import store from "./vuex/store"

new Vue({
	el: "#app",
	store,
	router,
	...App,
	//render: h => h(App)
})