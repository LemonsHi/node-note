const http = require('http')
const cheerio = require('cheerio')
const fs = require('fs')

const url = 'http://www.imooc.com/learn/348'

const filter = (html) => {
  let $ = cheerio.load(html)
  let chapters = $('.chapter')
  let crawlerData = []
  chapters.each((item) => {
    let chapterData = {
      title: '',
      videos: []
    }
    let chapter = $(chapters[item])
    let chapterTitle = chapter.find('h3').text().trim()
    let videos = chapter.find('li')
    chapterData.title = chapterTitle
    videos.each((_item_) => {
      let video = $(videos[_item_])
      chapterData.videos.push({
        id: video.data('media-id'),
        title: video.text().trim()
      })
    })
    crawlerData.push(chapterData)
  })
  return crawlerData
}

const printData = (data) => {
  let text = ''
  data.forEach((item) => {
    text += `${item.title}\n`
    item.videos.forEach((_item_) => {
      text += ` [${_item_.id}] ${_item_.title}\n`

    })
  })
  fs.writeFile('data.txt', text, (err) => {
    if (err) return console.error(err);
    console.log("数据写入成功！");
    console.log("--------我是分割线-------------")
    console.log("读取写入的数据！");
  })
}

http.get(url, (res) => {
  let html = ''

  res.on('data', (data) => {
    html += data
  })

  res.on('end', () => {
    printData(filter(html))
  })
}).on('eror', () => {
  console.log(`获取数据出错！`);
})
