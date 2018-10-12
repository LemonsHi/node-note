const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// 创建 application/x-www-form-urlencoded 编码解析
const urlencodeParser = bodyParser.urlencoded({extended: false})

app.get('/index', (req, res) => {
  console.log(__dirname)
  res.sendFile(`${__dirname}/post_index.html`)
})

app.post('/process_post', (req, res) => {
  let response = {
    'first_name': req.body.first_name,
    'last_name': req.body.last_name
  }
  // let response = ''
  console.log(response)
  res.end(JSON.stringify(response))
})

const server = app.listen(8081, () => {
  let host = server.address().address
  let port = server.address().port

  console.log(`应用实例，访问地址为 http://${host}:${port}`)
})
