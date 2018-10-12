const express = require('express')
const app = express()

app.get('/index', (req, res) => {
  console.log(__dirname)
  res.sendFile(`${__dirname}/get_index.html`)
})

app.get('/process_get', (req, res) => {
  let response = {
    'first_name': req.query.first_name,
    'last_name': req.query.last_name
  }
  console.log(response)
  res.end(JSON.stringify(response))
})

const server = app.listen(8081, () => {
  let host = server.address().address
  let port = server.address().port

  console.log(`应用实例，访问地址为 http://${host}:${port}`)
})
