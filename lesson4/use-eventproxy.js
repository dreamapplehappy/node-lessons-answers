const express = require('express');
const utility = require('utility');
const superagent = require('superagent');
const cheerio = require('cheerio');
const EventProxy = require('eventproxy');
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
            let itemNum = 6;
            let ep =  new EventProxy();

            ep.after('read_topic', itemNum + 1, (data) => {
                items = items.concat(data);
                res.send(items);
            });

            $('#topic_list .topic_title').each(function (idx, element) {
                if(idx > itemNum) {
                    return;
                }
                let $element = $(element);
                let topicId = $element.attr('href').slice(7);

                superagent.get('https://cnodejs.org/topic/' + topicId)
                    .end((err, sres) => {
                        if(err) {
                            return next(err);
                        }
                        let $ = cheerio.load(sres.text);
                        //items.push();
                        ep.emit('read_topic', {
                            title: $element.attr('title'),
                            href: $element.attr('href'),
                            author: $('#content .changes span').eq(1).text().trim(),
                            score: $('.board .floor .big').text().trim()
                        });
                    })
            });
        });
});

app.listen(3000, () => {
    console.log('app is running at port 3000');
});