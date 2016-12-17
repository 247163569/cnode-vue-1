import promise from "es6-promise"
import "whatwg-fetch"

export let getList = async (page, tag) => {
	let response = await fetch(`https://cnodejs.org/api/v1/topics?page=${page}&limit=20&tab=${tag}`, {
		mode: "cors"
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let getTopic = async (topicId) => {
	let response = await fetch(`https://cnodejs.org/api/v1/topic/${topicId}`, {
		mode: "cors"
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let login = async (token) => {
	let response = await fetch(`https://cnodejs.org/api/v1/accesstoken `, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: `accesstoken=${token}`
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let collect = async (params) => {
	let response = await fetch(`https://cnodejs.org/api/v1/topic_collect/collect `, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: params
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let like = async (id, token) => {
	let response = await fetch(`https://cnodejs.org/api/v1/reply/${id}/ups`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: `accesstoken=${token}`
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let reply = async (token, topicId, content, replyId) => {
	let body = replyId ? `accesstoken=${token}&content=${content}&reply_id=${replyId}` : `accesstoken=${token}&content=${content}`

	let response = await fetch(`https://cnodejs.org/api/v1/topic/${topicId}/replies`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: body
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let getProfile = async (nickname) => {
	let response = await fetch(`https://cnodejs.org/api/v1/user/${nickname}`, {
		mode: "cors"
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let getMessages = async (token) => {
	let response = await fetch(`https://cnodejs.org/api/v1/messages?accesstoken=${token}`, {
		mode: "cors"
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let getMessageCount = async (token) => {
	let response = await fetch(`https://cnodejs.org/api/v1/message/count?accesstoken=${token}`, {
		mode: "cors"
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let post = async ({token, title, tab, content}) => {
	let response = await fetch("https://cnodejs.org/api/v1/topics", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		mode: "cors",
		body: `accesstoken=${token}&title=${title}&tab=${tab}&content=${content}`
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}