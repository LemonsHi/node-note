const http = require('http')
const querystring = require('querystring')

const postHTML = `
<html>
  <head>
    <meta charset="utf-8">
    <title>菜鸟教程 Node.js 实例</title>
  </head>
  <body>
    <form method="post">
      网站名： <input name="name"><br>
      网站 URL： <input name="url"><br>
      <input type="submit">
    </form>
  </body>
</html>
`

http.createServer((req, res) => {
  let body = ''
  req.on('data', (chunk) => {
    console.log('chunk', chunk)
    body += chunk
  })
  req.on('end', () => {
    // 解析参数
    body = querystring.parse(body)
    // 设置响应头部信息及编码
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'})
    if(body.name && body.url) {
      console.log('body', body)
      // 输出提交的数据
      res.write("网站名：" + body.name);
      res.write("<br>");
      res.write("网站 URL：" + body.url);
    } else {
      // 输出表单
      res.write(postHTML);
    }
    res.end()
  })
}).listen(8888)
