const http = require('http');
const dotenv = require('dotenv').config();
const router = new (require('./Util/router'))();
const api = require('./api');
const port = process.env.PORT || 1337;

router.use(api);

http.createServer((req, res) => {
    router.handler(req, res);
}).listen(port);

