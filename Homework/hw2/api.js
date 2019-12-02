const router = new(require('./Util/router'))();
const Log = require('./Util/logger');
const event = require('./Util/event');

function parseQuery(query){
    let obj = {};
    let list = query.split('&');
    list.forEach(element => {
        element = element.split('=');
        obj[element[0]]=element[1];
    });
    return obj;
};

router.get('/addTicket', async (req, res) => {
    let query = parseQuery(req.url.split('\n')[0].split("?")[1]);
    await event.addTicket(query.name);
    Log.write('[GET] /addTicket - 200');
    res.writeHeader(200);
    res.end('hello');
});

router.post('/getAllTickets', (req, res) => {
    let body = "";

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        let user = JSON.parse(body);

        if(user.id != process.env.ADMIN_USER || user.password != process.env.ADMIN_PASSWORD){
            Log.write('[POST] /getAllTickets - 403 - INCORRECT LOGIN');
            res.writeHeader(403);
            res.end('INVALID ACCESS');
        }
        else{
            Log.write('[POST] /getAllTickets - 200');
            let result = await event.getAllTickets();
            res.writeHeader(200);
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;