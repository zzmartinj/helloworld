var net = require('net');

var server=net.createServer(function(conn){
    console.log("Connected!");

    conn.on('data',function(data){
        console.log(data + ' from ' + conn.remoteAddress + ' ' +conn.remotePort);
        conn.write('Repeating', + data);

    });

    conn.on('close',function(){
        consol.log('closing connection');
    });

}).listen(8124);

console.log('listening on port 8124');
console.log(process.memoryUsage());
console.log(process.execPath);