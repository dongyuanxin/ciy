const http = require('http');

http.createServer((req, res) => {
    console.log(req.headers);
    res.end('end');
}).listen(9999);
