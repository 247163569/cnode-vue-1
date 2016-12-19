const path = require("path")
const express = require("express")
const app = express()
const contentBase = path.join(__dirname, "dist")

app.set("x-powered-by", false)

app.use(express.static(contentBase))
app.use("/static/cnode/", express.static(contentBase))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "dicontentBase/index.html"))
})

app.listen(8080)
