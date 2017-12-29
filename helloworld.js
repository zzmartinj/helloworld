var http = require('http');
var fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
var counter=0;

function writeNumbers(res){
    
    //increment and log counter
    for (i=0; i<100; i++){
        counter++;
        res.write(counter.toString()+'\n');
    }
}

const server = http.createServer((req, res) => {
    fs.readFile('helloworld.js', 'utf8', function (err, data) {       
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        writeNumbers(res);
        if (err){
            res.write('Issue opening up the file!\n');            
        }
        else{
            //no error? write out the file
            res.write(data);
        }
        res.end();
    });
})


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});