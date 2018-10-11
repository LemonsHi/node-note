const http = require('http')
const url = require('url')

exports.start = (route) => {
  let onRequest = (request, response) => {
    let pathname = url.parse(request.url).pathname
    if(pathname == '/favicon.ico'){
      return;
    }
    console.log(`Request for ${pathname} received.`)
    route(pathname)
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.write('Hello World')
    response.end()
  }
  http.createServer(onRequest).listen(8888)
  console.log(`Server has started.`)
}
