/**
 * @package LogMonitor
 * @license http://www.opensource.org/licenses/mit-license.php
 * @author José Vte. Calderón Cabrera <jvcalcab@gmail.com>
 */

var email = function(logger, config) {
	this.__construct(logger, config);
	};
	
	
email.prototype.__construct = function(logger, config) {		
	this.logger = logger;
	this.config = config;
	this.emailjs = require('emailjs');
	this.emailjs = this.emailjs.server.connect(this.config.mail.config);
	};	
	
email.prototype.send = function(message) {
	
	this.emailjs.send({
		
		"text": message,
		"from": this.config.mail.defaultParameters.from,
		"to": this.config.mail.defaultParameters.to,
		"subject": this.config.mail.defaultParameters.subject,
		
		}, function(err, message) {
			if(err != null) {
				this.logger.error(err);
				}
			});
	
	};	
	
module.exports=email;	
	