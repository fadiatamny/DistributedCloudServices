const http = require('http');
const dotenv = require('dotenv').config();
const router = new(require('./Util/router'))();
const api = require('./api');
const fs = require('fs');
const port = process.env.PORT || 1337;
const Log = new(require('./Util/logger'))();

Log.emit('initalize');

router.use('/api', api);

http.createServer((req, res) => {
    router.handler(req, res);
}).listen(port);