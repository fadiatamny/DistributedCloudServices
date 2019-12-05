const log = require('./logger');
class Handler {
    static parseQuery(query) {
        let obj = {};
        let list = query.split('&');
        list.forEach(element => {
            element = element.split('=');
            obj[element[0]] = element[1];
        });
        return obj;
    };

    static error(err, res, route) {
        if (!err.status) {
            err['status'] = 500
            err.message = 'SERVER ERROR';
        }
        log.emit('write', `${route.method} ${route.path} - ${err.status} - ${err.message}`);
        res.writeHeader(err.status);
        res.end(`Error occured - ${err.message}`);
    };

    static validateKey(req) {
        let query = req.url.split("?")[1];
        if (!query) throw {
            'status': 403,
            'message': 'INVALID ACCESS - Missing AUTH key'
        };
        query = Handler.parseQuery(query);
        if (!query.key || query.key != process.env.KEY) throw {
            'status': 403,
            'message': 'INVALID ACCESS - Missing AUTH key'
        };

        return query;
    };
}

module.exports = Handler;