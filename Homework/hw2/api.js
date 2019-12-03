const router = new(require('./Util/router'))();
const Log = require('./Util/logger');
const event = require('./Util/event');

function parseQuery(query) {
    let obj = {};
    let list = query.split('&');
    list.forEach(element => {
        element = element.split('=');
        obj[element[0]] = element[1];
    });
    return obj;
};

router.get('/addTicket', async (req, res) => {
    try {
        let query = parseQuery(req.url.split('\n')[0].split("?")[1]);
        await event.addTicket(query.name);
        Log.write('[GET] /addTicket - 200');
        res.writeHeader(200);
        res.end('Successfully purchased a ticket!');
    } catch (err) {
        Log.write(`[GET] /addTicket - ${err.status} - ${err.message}`);
        res.writeHeader(err.status);
        res.end(`Error purchasing ticket - ${err.message}`);
    }
});

router.post('/getAllTickets', (req, res) => {
    let body = "";

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            body = JSON.parse(body);
            if (!body.key || body.key != process.env.KEY) {
                Log.write('[POST] /getAllTickets - 403 - INCORRECT KEY');
                res.writeHeader(403);
                res.end('INVALID ACCESS');
            } else {
                Log.write('[POST] /getAllTickets - 200');
                let result = await event.getAllTickets();
                res.writeHeader(200);
                res.end(JSON.stringify(result));
            }
        } catch (err) {
            Log.write(`[POST] /getAllTickets - ${err.status} - ${err.message}`);
            res.writeHeader(err.status);
            res.end(`Error purchasing ticket - ${err.message}`);
        }
    });
});

module.exports = router;