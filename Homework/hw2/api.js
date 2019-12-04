const router = new(require('./Util/router'))();
const Log = new(require('./Util/logger'))();
const event = require('./Util/event');
const handler = require('./Util/handler');

router.get('/getAllTickets', async (req, res) => {
    try {
        let query = handler.validateKey(req);
        let result = await event.getAllTickets();
        Log.emit('write','[POST] /getTicket - 200');
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
        let result = (await event.getTicket(query.id))[0];
        Log.emit('write','[POST] /getTicket - 200');
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
            console.log(query);
            await event.addTicket(query.name);
            Log.emit('write','[GET] /addTicket - 200');
            res.writeHeader(200);
            res.end('Successfully purchased a ticket!');
        } catch (err) {
            handler.error(err, res, '/addTicket');
        }
    });
});

router.put('/updateTicket', async (req, res) => {
    let params = req.url.split('/');
    params = params.splice(params.indexOf('updateticket') + 1);
    let item = await event.getTicket(params[0]);

    if (!item) {
        handler.error({
            'status': 404,
            'message': 'ID does not EXIST'
        }, res, '/updateTicket');
    } else {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            body = JSON.parse(body);

            try {
                //WELP FUCK. TICKETS ARE NUM OF TICKETS THEY HAVE RERERERERERe
                if(body.name)
                    item.name = body.name;     
            } catch (err) {
                handler.error(err, res, '/addTicket');
            }
        });
    }

});

module.exports = router;