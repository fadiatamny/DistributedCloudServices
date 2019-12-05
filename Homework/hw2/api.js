const router = new(require('./Util/router'))();
const log = require('./Util/logger');
const event = require('./Util/event');
const handler = require('./Util/handler');

router.get('/getAllOrders', async (req, res) => {
    try {
        handler.validateKey(req);
        let result = await event.getAllOrders();
        if (!result || result.length == 0) throw {
            'status': 204,
            'message': 'There are no orders'
        };
        log.emit('write', '[GET] /getOrder - 200');
        res.writeHeader(200);
        res.end(JSON.stringify(result));
    } catch (err) {
        handler.error(err, res, {
            'path': '/getAllOrders',
            'method': '[GET]'
        });
    }
});

router.get('/getOrder', async (req, res) => {
    try {
        let query = handler.validateKey(req);
        if (!query.id) throw {
            'status': 403,
            'message': 'INVALID ACCESS - missing Order ID'
        };
        let result = await event.getOrder(query.id);
        if (result.length == 0) throw {
            'status': 204,
            'message': 'There is no order with that id'
        };
        result = result[0];
        log.emit('write', '[GET] /getOrder - 200');
        res.writeHeader(200);
        res.end(JSON.stringify(result));
    } catch (err) {
        handler.error(err, res, {
            'path': '/getOrder',
            'method': '[GET]'
        });
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
        handler.error(err, res, {
            'path': '/updateOrder',
            'method': '[PUT]'
        });
    }
});

router.post('/addOrder', async (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        body = JSON.parse(body);
        try {
            if (!body.name || !body.ticketsNumber || !body.id) throw {
                'status': 403,
                'message': 'INVALID ACCESS - Required details are missing'
            };

            let result = await event.getOrder(body.id);
            if (result.length != 0) throw {
                'status': 409,
                'message': 'ID already exists'
            };

            await event.addOrder(body);
            log.emit('write', '[GET] /addOrder - 200');
            res.writeHeader(200);
            res.end('Successfully purchased a Order!');
        } catch (err) {
            handler.error(err, res, {
                'path': '/addOrder',
                'method': '[POST]'
            });
        }
    });
});

router.put('/updateOrder', async (req, res) => {
    let params = req.url.toLowerCase().split('/');
    params = req.url.split('/').splice(params.indexOf('updateOrder'.toLowerCase()) + 1);
    if (params == [''])
        handler.error({
            'status': 403,
            'message': 'missing id to update'
        } , res, {
            'path': '/updateOrder',
            'method': '[PUT]'
        });
    let item = await event.getOrder(params[0]);
    if (item.length == 0) {
        handler.error({
            'status': 404,
            'message': 'ID does not EXIST'
        }, res, {
            'path': '/updateOrder',
            'method': '[PUT]'
        });
    } else {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            body = JSON.parse(body);
            try {
                item = item[0];
                let oldTickets = item.ticketsNumber;
                if (body.name)
                    item.name = body.name;
                if (body.ticketsNumber)
                    item.ticketsNumber = body.ticketsNumber;
                console.log(oldTickets);
                await event.updateOrder(item, oldTickets);
                log.emit('write', '[PUT] /updateOrder - 200');
                res.writeHeader(200);
                res.end('Successfully updated an order!');
            } catch (err) {
                handler.error(err, res, {
                    'path': '/updateOrder',
                    'method': '[PUT]'
                });
            }
        });
    }

});

router.delete('/deleteOrder', async (req, res) => {
    try {
        let params = req.url.toLowerCase().split('/');
        params = req.url.split('/').splice(params.indexOf('deleteOrder'.toLowerCase()) + 1);
        if (params == [''])
            throw {
                'status': 403,
                'message': 'missing id to delete'
            }
        let result = await event.getOrder(params[0]);
        if (result.length == 0) throw {
            'status': 409,
            'message': 'There is no order with that id'
        };
        await event.deleteOrder(params[0]);
        log.emit('write', '[DELETE] /deleteOrder - 200');
        res.writeHeader(200);
        res.end('Successfully deleted order!');
    } catch (err) {
        handler.error(err, res, {
            'path': '/deleteOrder',
            'method': '[DELETE]'
        });
    };
});

router.delete('/resetOrders', async (req, res) => {
    try {
        let params = req.url.toLowerCase().split('/');
        params = req.url.split('/').splice(params.indexOf('resetOrders'.toLowerCase()) + 1);

        if (params[0] != process.env.KEY)
            throw {
                'status': 403,
                'message': 'Invalid access'
            }

        await event.clearOrders();
        log.emit('write', '[DELETE] /resetOrders - 200');
        res.writeHeader(200);
        res.end('Successfully reset order list!');
    } catch (err) {
        handler.error(err, res, {
            'path': '/resetOrders',
            'method': '[DELETE]'
        });
    };
});

module.exports = router;