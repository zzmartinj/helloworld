var http = require('http');
var fs = require('fs');

var pathname = '';
var mime = require('mime');


function processfile(pathname, req, res) {
    //we process the request because the file exists
    var filetoprocess = fs.createReadStream(pathname);
    filetoprocess.on("open", function() {
        filetoprocess.pipe(res);
    });
    filetoprocess.on("error", function() {
        console.log("error processing file! " + err);
    });
}

//create the http server
http.createServer(function(req, res) {
    pathname = __dirname + req.url;
    console.log("Path name is: " + pathname);

    fs.exists(pathname, function(exists) {
        if (exists) {

            var mimetype = mime.getType(pathname);
            res.setHeader('Content-type', mimetype);
            processfile(pathname, req, res);
        } else { //We didn't find the file.
            res.writeHead(404);
            res.write('Bad Request. File not found!');
            res.end(); //put the end of the response here to avoid async issue

        }
    });

}).listen(8214);

console.log("running our sample web server on port 8214 ");