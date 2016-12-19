const path = require("path")
const express = require("express")
const app = express()

app.set("x-powered-by", false)

app.use(express.static(path.join(__dirname, "dist")))
app.use("/static/cnode/", express.static(path.join(__dirname, "dist")))

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./index.html"))
})

app.listen(8080)
