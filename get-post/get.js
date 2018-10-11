const http = require('http')
const url = require('url')
const util = require('util')

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
  // util.inspect() -- 法返回 object 的字符串表示，主要用于调试
  // url.parse() -- 解析一个 URL 字符串并返回一个 URL 对象
  res.end(util.inspect(url.parse(req.url, true)))
}).listen(3000)
