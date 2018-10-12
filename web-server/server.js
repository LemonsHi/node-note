const http = require('http')
const fs = require('fs')
const url = require('url')

// 创建服务器
http.createServer((req,res) => {
  // 解析请求，包括文件名
  let pathname = url.parse(req.url).pathname
  if(pathname == '/favicon.ico'){
    return
  }
  // 输出文件名
  console.log(`Request for ${pathname} received.`)
  // 从文件系统中读取请求文件内容
  fs.readFile(pathname.substr(1), (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(data.toString())
    res.end()
  })
}).listen(8080)

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/')
