var crypto = require('crypto');
var config = require('../config.json');

function controller(app, session) {
	
app.get('/login', function (req, res) {
	res.render('login.jade');
	});	
	
app.post('/login', function (req, res) {
	
	if(validateUser(req.body.user, req.body.password)) {	
		var timestamp = new Date().getTime();
		var rand = Math.floor(Math.random()*11);
		var sessionId = crypto.createHash('md5').update(timestamp.toString()+rand.toString()).digest('hex');
		
		session[sessionId] = timestamp;
		
		res.writeHead(200, {
		'Set-Cookie':'sessionId='+sessionId+'; expires='+new Date(new Date().getTime()+86409000).toUTCString()
		});
		res.end("Successfully validated!\n");
		
		}
	else {
		res.writeHead(403);
		res.end("Authentication failure\n");
		}
	
	});

}

function validateUser(user, pwd) {
	
	var users = JSON.parse(config).users;
	
	for(index in users)
		{
		
		if(users[index].login == user && users[index].password == pwd)
			{
			return true;
			}
		
		}
	
	return false;
	
}

module.exports.controller = controller;