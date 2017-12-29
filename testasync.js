var http=require('http');

//the url we want to test
var options={
    host: 'localhost',
    port: 3000,
    method: 'GET'    
};

var processPublicTimeline=function(res){
    //are we finished? Ok, write out to the console
    console.log('finished request');
};

for (var i=0; i< 1500; i++){
    //make the request yo!
    http.request(options, processPublicTimeline).end();
}