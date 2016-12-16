import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

let data = {}

localStorage.getItem("user") && (data = JSON.parse(localStorage.getItem("user")))

const state = {
	accesstoken: data.accesstoken || "",
	nickname: data.nickname || "",
	avatar: data.avatar || ""
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
	}
}

const getters = {
	accesstoken: state => {
		return state.accesstoken
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