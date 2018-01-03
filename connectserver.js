var connect = require('connect');
var http = require('http');

var app = connect();
app.use(function (req, res) {
    res.end('Hello World!\n');
});

http.createServer(app).listen(8224);
console.log('Created connect server on port 8224');