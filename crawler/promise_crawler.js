var http = require('http');
// var Promise = require('bluebird');
var cheerio = require("cheerio");
var baseUrl = "http://www.imooc.com/learn/";
var videoIds = [348, 259, 197, 134, 75];
var fetchCourseArray = []

function filterChapters(html) {
    var $ = cheerio.load(html);
    var chapters = $('.chapter');
    var title = $('.course-infos .pr .hd h2').text();
    var number = parseInt($('.course-infos .pr .statics .static-item .js-learn-num').text().trim(), 10);
    var number = parseInt($($('.course-infos .pr .statics .static-item')[1]).find('.js-learn-num').text().trim(), 10);
    // console.log('学过的人数：' + $($($('.course-infos .pr .statics .static-item')[0]).find('span')[1]).text().trim())
    console.log('学过的人数：' + $('.js-learn-num').text())

    var courseData = {
        title: title,
        number: number,
        videos: []
    };
    chapters.each(function (item, index) {
        var chapter = $(this);
        var chapterTitle = chapter.find("strong").text().trim().replace(/[\r\n]/g, "").replace(/[ ]/g, "");
        var videos = chapter.find(".video").children("li");
        // console.log(chapterTitle)

        var chapterData = {
            chapterTitle: chapterTitle.trim(),
            videos: []
        };
        videos.each(function (item, index) {
            var video = $(this).find(".J-media-item");
            var videoTitle = video.text();
            var id = video.attr('href').split('video/')[1];
            chapterData.videos.push({
                title: videoTitle.trim(),
                id: id.trim()
            });
        });
        courseData.videos.push(chapterData);
    });
    return courseData;
}

function printCourseInfo(coursesData) {
  coursesData.forEach(function (courseData) {
    console.log(courseData.number + '人学过' + courseData.title + '\n');

  })
  coursesData.forEach(function (courseData) {
    console.log('### ' + courseData.title + '\n')

    courseData.videos.forEach(function (item) {
      var chapterTitle = item.chapterTitle;
      console.log(chapterTitle);
      item.videos.forEach(function (video) {
        console.log(video.id + '---' + video.title);
      })
    })
  })
}

function getPageAsync(url) {
  return new Promise(function (resolve, reject) {
    console.log('正在爬取 ' + url)
    http.get(url, function (res) {
      var html = '';
      res.on('data', function (data) {
        html += data;
      })

      res.on("end", function () {
        resolve(html);
      })
    }).on('error', function (e) {
      reject(e)
    });
  })
}

// 程序入口
videoIds.forEach(function (id) {
  fetchCourseArray.push(getPageAsync(baseUrl + id));
});

Promise.all(fetchCourseArray).then(function (pages) {
  var coursesData = [];
  pages.forEach(function (html) {
    var courses = filterChapters(html);
    coursesData.push(courses);
  })
  coursesData.sort(function (a, b) {
    return a.number < b.number
  })

  printCourseInfo(coursesData)
});
