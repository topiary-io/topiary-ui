var express = require("express")
var compress = require("compression")

var app = express()

app.use(compress())
app.use(express.static("./"))

app.use("*", (req, res, next) => {
  res.send(
    "<!doctype html><meta charset='utf-8'><title>Mithril-Redux</title><link rel='stylesheet' href='/main.css'><script>window.ADMIN_ROOT=\"/mithril-ui/\"</script><script defer src='/bundle.js'></script><div class='loader'>Loading...</div>"
  )
})

app.listen(3333)
