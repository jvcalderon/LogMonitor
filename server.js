var logger = require('./logger.js');
var config = require('./config.json');
var spawn = require('child_process').spawn;
var express = require('express');
var io = require('socket.io');
var cookie = require('cookie');
var webController = require('./controllers/webController.js');
var loginController = require('./controllers/loginController.js');

//Server---------------------------------------------

var PORT = 8888;
var app = express();
var session = new Object();

app.use(express.bodyParser());
app.use(express.methodOverride());

var server = app.listen(PORT, function() {
	
	webController.controller(app);
	loginController.controller(app, session);

	console.log("Listen on port " + PORT);
    
	});

app.use("/js", express.static(__dirname + '/static/js'));
app.use("/css", express.static(__dirname + '/static/css'));


//IO---------------------------------------------------

var io = io.listen(server);

io.configure(function () {
    io.set('authorization', function (handshakeData, callback) {
    	
    	var cookies = cookie.parse(handshakeData.headers.cookie);
    	var sessionId = cookies['sessionId'];
    	
		if(session[sessionId])
			{
			callback(null, true);
			}
		else
			{
			return callback(null, false);
			}
    	
    	});
    
	});  

var socket = io.sockets.on('connection', function(socket) {
    console.log('Client connected to socket');
    });


//App-------------------------------------------------

logger = new logger();

var tails = new Array();
var dataHandlers = new Array();
for(key in config.logsToTail)
	{
	
	tails.push(spawn('tail', ['-f', config.logsToTail[key].logFile]));
	
	dataHandlers[key] = require('./handler/dataHandler/'+config.logsToTail[key].dataHandler+'.js');
	dataHandlers[key] = new dataHandlers[key](socket, config.logsToTail[key].name);
	
	tails[key].stdout.on('data', function(data){
		dataHandlers[key].handle(data.toString());
	});
	
	}