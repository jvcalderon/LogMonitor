function controller(app) {

app.get('/', function (req, res) {
	res.render('symfony2.jade');
	});

}

module.exports.controller = controller;