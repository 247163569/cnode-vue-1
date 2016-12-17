import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

let data = {}

localStorage.getItem("user") && (data = JSON.parse(localStorage.getItem("user")))

const state = {
	tail: data.tail || "",
	avatar: data.avatar || "",
	nickname: data.nickname || "",
	accesstoken: data.accesstoken || ""
}

const mutations = {
	accesstoken(state, accesstoken) {
		state.accesstoken = accesstoken
	},
	nickname(state, nickname) {
		state.nickname = nickname
	},
	avatar(state, avatar) {
		state.avatar = avatar
	},
	tail(state, tail) {
		state.tail = tail
	}
}

const getters = {
	accesstoken: state => {
		return state.accesstoken
	},
	tail: state => {
		return state.tail
	},
	avatar: state => {
		return state.avatar
	},
	nickname: state => {
		return state.nickname
	}
}

export default new Vuex.Store({
	state,
	getters,
	mutations
})