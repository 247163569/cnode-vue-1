export let serialize = (obj) => {
	let str = ""

	for (let key in obj) {
		str += `${key}=${obj[key]}&`
	}

	str = str.slice(0, -1)

	return str
}

export let getURLParams = () => {
	let a = location.search.slice(1),
		b = a.split("&"),
		c = {}

	b.forEach(function (item, index) {
		let name = item.split("=")[0],
			value = item.split("=")[1]

		c[name] = value
	})

	return c
}