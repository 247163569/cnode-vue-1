export let timeFormat = (value) => {
	let timestamp = + new Date - + new Date(value),
		year = ~~ (timestamp / (12 * 30 * 24 * 60 * 60 * 1000)),
		month = ~~ (timestamp / (30 * 24 * 60 * 60 * 1000)),
		day = ~~ (timestamp / (24 * 60 * 60 * 1000)),

		hour = ~~ (timestamp / (60 * 60 * 1000)),
		minute = ~~ (timestamp / (60 * 1000)),
		second = ~~ (timestamp / 1000),
		millisecond = timestamp

	// if (year) {
	// 	return `${year} 年前`
	// }

	// if (month) {
	// 	return `${month} 个月前`
	// }

	if (day) {
		//return `${day} 天前`

		return value.split("T")[0]
	}

	if (hour) {
		return `${hour} 小时前`
	}

	if (minute) {
		return `${minute} 分钟前`
	}

	if (second) {
		if (second && second < 10) {
			return "刚刚"
		}

		return `${second} 秒前`
	}

	// 处理 本地评论插入时的日期
	if (millisecond) {
		return "刚刚"
	}

}
export let ISOTimeFormat = (value) => {
	let date = new Date(value),
		year = date.getUTCFullYear(),
		month = date.getUTCMonth() < 10 ? "0" + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1,
		day = date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate(),
		hour = date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours(),
		minute = date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes(),
		second = date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds(),
		millisecond = date.getUTCMilliseconds() < 10 ? "0" + date.getUTCMilliseconds() : date.getUTCMilliseconds()

	return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`
}