// fs - 文件系统
var fs = require('fs')

// 阻塞模式
var data = fs.readFileSync('../input.txt')
console.log(data.toString())
console.log('program end!');

// >> input 内容
// >> program end!

// 非阻塞模式
// fs.readFile('../input.txt', function (err, data) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(data.toString())
// })
//
// console.log('program end!');

// >> program end!
// >> input 内容
