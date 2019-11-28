const http = require('http');
const url = require('url');
const EventHandler = require('./eventHandler');

const port = 1337;

http.createServer( (req, res) => {
    let url = req.url.split('\n');

    switch(req.method){
        case 'POST':
            break;

        case 'GET':
            switch(url[0]){
               case '/hello':
                   res.writeHead(200);
                   res.end(EventHandler.hello());
                   break; 
            }
            break;

        default:
            res.writeHead(404);
            res.end();
    }

}).listen(port);
