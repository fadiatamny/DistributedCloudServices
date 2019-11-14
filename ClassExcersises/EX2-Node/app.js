// const os = require('os');
// const s = `HELLOH ${process.version} on os ${os.type()}`

// console.log(s);

const http = require('http');

http.createServer( (req, res) => {
    res.writeHead(200);
    res.write("test");
    res.end();

}).listen(8080);

console.log("working");
