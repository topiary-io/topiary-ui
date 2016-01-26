var express = require("express")

var app = express()

app.use(express.static("./"))

app.use("*", (req, res, next) => {
  res.send(
    "<!doctype html><meta charset='utf-8'><title>Mithril-Redux</title><script defer src='/bundle.js'></script>"
  )
})

app.listen(3000)
