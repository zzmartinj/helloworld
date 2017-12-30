//Working example of how to create some event handlers in Node and also using inherits two ways

//Add all the includes
var util = require('util');
var eventEmitter = new require('events').EventEmitter;
var fs = require('fs');

function inputChecker(name, file) {
    this.name = name;
    this.writeStream = fs.createWriteStream('./' + file + '.txt',
        {
            'flags': 'a',
            'encoding': 'utf8',
            'mode': 0666
        });
}
util.inherits(inputChecker, eventEmitter);

inputChecker.prototype.check = function check(input) {
    var command = input.toString().trim().substr(0, 3);
    console.log('command is ' + command);
    if (command == 'wr:') {
        this.emit('write', input.substr(3, input.length));

    } else if (command == 'en') {
        this.emit('end');

    } else {
        this.emit('echo', input);
    }
};

//let's test event handling/emitting here
var ic = new inputChecker('myTest', 'output');
ic.on('write', function (data) {
    this.writeStream.write(data, 'utf8');
    console.log('written');
});

ic.on('echo', function (data) {
    console.log(this.name + ' wrote ' + data);
});

ic.on('end', function (data) {
    console.log('ending');
    process.exit();
});

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (input) {
    ic.check(input); // call our input checker!
});