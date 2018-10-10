const events = require('events')

const eventEmitter = new events.EventEmitter()

// 事件参数传递
eventEmitter.on('someEvent', (arg1, arg2) => {
  console.log('listener1', arg1, arg2)
})

eventEmitter.on('someEvent', (arg1, arg2) => {
  console.log('listener2', arg1, arg2)
})

// 执行同名事件，按注册顺序分别执行
eventEmitter.emit('someEvent', '参数1', '参数2')
