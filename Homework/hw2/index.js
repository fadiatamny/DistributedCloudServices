const http = require('http');
const dotenv = require('dotenv').config();
const router = new(require('./Util/router'))();
const api = require('./api');
const fs = require('fs');
const port = process.env.PORT || 1337;
const log = require('./Util/logger');

log.emit('initialize');

router.use('/api', api);

http.createServer((req, res) => {
    router.handler(req, res);
}).listen(port);