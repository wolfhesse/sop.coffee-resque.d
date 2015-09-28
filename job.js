var resque = require('coffee-resque').connect({
	host: process.env.REDIS_SERVER || 'redis.wolfspool.chickenkiller.com',
	port: 6379
});

var fn = function(a,b) {
	//var a = Math.random(2);
	//var b = Math.random(3);
	console.log('a,b is ' + a + ' ' + b);
	resque.enqueue('math', 'add', [a, b], function(err, remainingJobs) {
		if (err) {
			console.log('error ' + err);
		}
		else {
			console.log('New job queued. Remaining jobs in queue: ' + remainingJobs);
		}
	});
};

var server_host = process.env.SERVER || 'wolfhesse.chickenkiller.com';
var server_port = process.env.SERVER_PORT || 2222;
var server_address = 'https://' + server_host + ':' + server_port + '/';
console.log('server_address is ' + server_address);
var id = Math.random();
var socket = require('socket.io-client')(server_address);
socket.on('connect', function() {
	console.log('client: connect ' + id);
	socket.emit('hello', 'client');
});

socket.on('data', function(data) {
	console.log('client:' + id + ' data ' + JSON.stringify(data));
	var payload = JSON.stringify(data);
	if (data.backbone_server_data.srv_id === 'hck-socket-d') {
		console.log("client:" + id + ' handling hck-socket-d');
		fn(data.backbone_server_data.x,data.backbone_server_data.y);
		//var usable = payload.split('|');
		//console.log("-> payload:" + id + ' :: ' + usable[1]);
	}
	else {
		console.log("client:" + id + " got data: " + payload);
	}
});
