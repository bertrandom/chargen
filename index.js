var net = require('net');

var ascii = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ';
ascii = ascii + ascii;

var server = net.createServer(function(c) {

	var offset = 0;

	var interval = setInterval(function() {
		if (c.writable) {
			c.write(ascii.slice(offset,72+offset) + '\r\n');
			offset++;
			if (offset >= 95) {
				offset = 0;
			}
		}
	}, 0);

	c.on('error', function(e) {

		if (e.code === "ECONNRESET") {
        	console.log("Client quit unexpectedly; ignoring exception.");
		} else {
        	console.log("Exception encountered:");
        	console.log(e.code);
        	process.exit(1);
    	}

	});

	c.on('end', function() {
		clearInterval(interval);
	});

});

server.listen(19, function() {});