const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

const server = app.listen(8081, () => {
  let host = server.address().address
  console.log(server.address());
  let port = server.address().port

  console.log(`应用实例，访问地址为 http://${host}:${port}`)
})
