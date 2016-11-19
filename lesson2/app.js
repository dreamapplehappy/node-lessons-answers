const express = require('express');
const utility = require('utility');
const app = express();

app.get('/', (req, res) => {
    let q = req.query.q;
    let qAfterMD5;
    // 防止你没有传递值
    qAfterMD5 = undefined === q ? 'Nothing' : utility.md5(q);
    res.send('Hello World ' + qAfterMD5);
});

app.listen(3000, () => {
    console.log('app is running at port 3000');
});