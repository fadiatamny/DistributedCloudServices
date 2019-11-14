const app = require("../app");
const http = require("http");

const port = 1337;
app.set("port", port);

const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Server Listening on port ${port}`);
});