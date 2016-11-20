const express = require('express');
const utility = require('utility');
const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');
const app = express();

app.get('/', (req, res, next) => {
    superagent.get('https://cnodejs.org/')
        .end((err, sres) => {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            let $ = cheerio.load(sres.text);
            let items = [];
            let itemsLink = [];
            let $element;
            $('#topic_list .topic_title').each(function (idx, element) {
                $element = $(element);
                let topicId = $element.attr('href').slice(7);
                let topicLink = 'https://cnodejs.org/topic/' + topicId;
                itemsLink.push(topicLink);
            });

            async.mapLimit(itemsLink, 2, (item, cb) => {
                superagent.get(item)
                    .end((err, sres) => {
                        if(err) {
                            return next(err);
                        }
                        let $ = cheerio.load(sres.text);
                        items.push({
                            title: $element.attr('title'),
                            href: $element.attr('href'),
                            author: $($('#content .changes').find('span')[1]).children('a').text()
                        });
                        cb(null, null)
                    })
            }, (err, results) => {
                if(err) {
                    return;
                }
                res.send(items);
            });

        });
});

app.listen(3000, () => {
    console.log('app is running at port 3000');
});