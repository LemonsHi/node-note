// events - 事件模块
const events = require('events')

// 创建 eventEmitter 对象
const eventEmitter = new events.EventEmitter()

let connectHandler = () => {
  console.log('connect success!')

  eventEmitter.emit('data_received')
}

eventEmitter.on('connection', connectHandler)

eventEmitter.on('data_received', () => {
  console.log('data received success!')
})

eventEmitter.emit('connection')

console.log('program end!');
