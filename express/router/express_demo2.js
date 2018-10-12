const express = require('express')
const app = express()

//  GET 请求
app.get('/', (req, res) => {
  console.log('主页 GET 请求')
  res.send('Hello GET')
})

//  POST 请求
app.post('/', (req,res) => {
  console.log('主页 POST 请求')
  res.send('Hello POST')
})

// /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
  console.log('/list_user GET 请求');
  res.send('用户列表页面');
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {
  console.log('/ab*cd GET 请求');
  res.send('正则匹配');
})

const server = app.listen(8081, () => {
  let host = server.address().address
  console.log(server.address());
  let port = server.address().port

  console.log(`应用实例，访问地址为 http://${host}:${port}`)
})
