const router = new(require('./Util/router'))();
const Log = require('./Util/logger');
const event = require('./Util/event');
const handler = require('./Util/handler');

router.get('/getAllTickets', async (req, res) => {
    try {
        let query = handler.validateKey(req);
        let result = await event.getAllTickets();
        Log.write('[POST] /getTicket - 200');
        res.writeHeader(200);
        res.end(JSON.stringify(result));
    } catch (err) {
        handler.error(err, res, '/getAllTickets');
    }
});

router.get('/getTicket', async (req, res) => {
    try {
        let query = handler.validateKey(req);
        if (!query.id) throw {
            'status': 403,
            'message': 'INVALID ACCESS - missing Ticket ID'
        };
        let result = await event.getTicket(query.id);
        Log.write('[POST] /getTicket - 200');
        res.writeHeader(200);
        res.end(JSON.stringify(result));
    } catch (err) {
        handler.error(err, res, '/getTicket');
    }

});

router.get('/getLog', async (req, res) => {
    const fs = require('fs');
    try {
        handler.validateKey(req);
        const file = fs.createReadStream(process.env.LOG_FILE || './log.txt');
        file.pipe(res);
        file.on('finish', () => {
            file.close();
        });

    } catch (err) {
        handler.error(err, res, '/getLog');
    }

});

router.post('/addTicket', async (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        body = JSON.parse(body);

        try {
            if (!body.key || body.key != process.env.KEY) throw {
                'status': 200,
                'message': ''
            };
            let query = handler.parseQuery(req.url.split("?")[1]);
            await event.addTicket(query.name);
            Log.write('[GET] /addTicket - 200');
            res.writeHeader(200);
            res.end('Successfully purchased a ticket!');
        } catch (err) {
            handler.error(err, res, '/addTicket');
        }
    });
});

module.exports = router;