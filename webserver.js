var http = require('http');
var fs = require('fs');
var base = './';
var pathname = '';


//create the http server
http.createServer(function(req, res) {
    pathname = base + req.url;
    console.log("Path name is: " + pathname);

    fs.exists(pathname, function(exists) {
        if (exists) {
            res.setHeader('Content-Type', 'static-html');
            //we process the request because the file exists
            var filetoprocess = fs.createReadStream(pathname);
            filetoprocess.on("open", function() {
                filetoprocess.pipe(res);
            });
            filetoprocess.on("error", function() {
                console.log("error processing file! " + err);
            })
        } else { //We didn't find the file.
            res.writeHead(404);
            res.write('Bad Request. File not found!');
            res.end();
        }
    });

}).listen(8214);

console.log("running our sample web serer on port 8214 ");