var fs = require("fs")
var zlib = require('zlib')

let writerStream = fs.createWriteStream('output.txt')

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('../input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'))
fs.createReadStream('../input.txt').pipe(writerStream)

console.log("文件压缩以及输出完成。")

// 解压 input.txt.gz 文件为 input.txt
// fs.createReadStream('input.txt.gz')
//   .pipe(zlib.createGunzip())
//   .pipe(fs.createWriteStream('../input.txt'))
//
// console.log("文件解压完成。")
