const router = new(require('./Util/router'))();

router.get('/hello', (req, res) => {
    res.writeHeader(200);
    res.end('hello');
});

router.post('/insert', (req, res) => {
    let body = "";
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {

        const newDataItem = JSON.parse(body);

        data.push(newDataItem);

        console.log(body);

        res.end('ok');
    });
});

module.exports = router;