var net = require('net');

var client = new net.Socket();
client.setEncoding('utf8');

//create a connection
client.connect('8124','localhost',function(){
    console.log('Connected to our socket server!');
    client.write('We dont need a browser!');

});

process.stdin.resume(); //get stdin ready!

//Echo sdin to the server
process.stdin.on('data',function(data){
    client.write(data);
});

client.on('data',function(data){
    console.log(data);
    
});

//on closing server
client.on('close', function(){
    console.log('Closed connection');
});
