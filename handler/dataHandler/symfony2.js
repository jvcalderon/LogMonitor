var symfony2 = function(socket, name) {
	this.__construct(socket, name);
	};
	
	
symfony2.prototype.__construct = function(socket, name) {		
	
	this.logFile = 'log.log';
	this.socket = socket;
	this.name = name;
	this.fs = require('fs');
	
	};	

symfony2.prototype.handle = function(data) {
	
	var d = new Date();
    var timestamp = d.getTime() + d.getTimezoneOffset()*60*1000;

	if(data.match("authenticated successfully"))
		{
		var value = '{"timestamp": "'+timestamp+'", "value": "1"}';
		this.socket.emit(this.name+'_auth', value);
		console.log(value);
		}
	
	};
	
module.exports=symfony2;	
	
	