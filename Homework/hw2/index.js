const http = require('http');
const dotenv = require('dotenv').config();
const router = new(require('./Util/router'))();
const api = require('./api');
const fs = require('fs');
const port = process.env.PORT || 1337;

let date = new Date();
let startMessage = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + "\t" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() +"\
\n--------------------\n";

fs.writeFile(process.env.LOG_FILE || './log.txt', startMessage, function (err) {
    if (err) throw err;
});

router.use('/api', api);

http.createServer((req, res) => {
    router.handler(req, res);
}).listen(port);