var socket = io.connect('/');
socket.on('connect', function() {
	console.log('Connected with Node.js socket');
});