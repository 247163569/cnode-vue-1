import promise from "es6-promise"
import "whatwg-fetch"

export const getList = async (page, tag) => {
	const response = await fetch(`https://cnodejs.org/api/v1/topics?page=${page}&limit=20&tab=${tag}`, {
		mode: "cors"
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export const getTopic = async (topicId) => {
	const response = await fetch(`https://cnodejs.org/api/v1/topic/${topicId}`, {
		mode: "cors"
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export const login = async (token) => {
	const response = await fetch(`https://cnodejs.org/api/v1/accesstoken `, {
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

export const collect = async (params) => {
	const response = await fetch(`https://cnodejs.org/api/v1/topic_collect/collect `, {
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

export const like = async (id, token) => {
	const response = await fetch(`https://cnodejs.org/api/v1/reply/${id}/ups`, {
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

export const reply = async (token, topicId, content, replyId) => {
	const body = replyId ? `accesstoken=${token}&content=${content}&reply_id=${replyId}` : `accesstoken=${token}&content=${content}`

	const response = await fetch(`https://cnodejs.org/api/v1/topic/${topicId}/replies`, {
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

export const getProfile = async (nickname) => {
	const response = await fetch(`https://cnodejs.org/api/v1/user/${nickname}`, {
		mode: "cors"
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export const getMessages = async (token) => {
	const response = await fetch(`https://cnodejs.org/api/v1/messages?accesstoken=${token}`, {
		mode: "cors"
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export const getMessageCount = async (token) => {
	const response = await fetch(`https://cnodejs.org/api/v1/message/count?accesstoken=${token}`, {
		mode: "cors"
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export const post = async ({token, title, tab, content}) => {
	const response = await fetch("https://cnodejs.org/api/v1/topics", {
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