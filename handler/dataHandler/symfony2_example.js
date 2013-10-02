/**
 * @package LogMonitor
 * @license http://www.opensource.org/licenses/mit-license.php
 * @author José Vte. Calderón Cabrera <jvcalcab@gmail.com>
 */

var symfony2 = function(name, logger, config) {
	this.__construct(name, logger, config);
	};
	
	
symfony2.prototype.__construct = function(name, logger, config) {		

	this.name = name;
	this.logger = logger;
	
	this.emailjs = require('../../email.js');
	this.emailjs = new this.emailjs(this.logger, config);
	
	};	

symfony2.prototype.handle = function(data) {
	
	if(data.match("CRITICAL"))
		{
		this.logger.error('['+this.name+'] '.data);
		this.emailjs.send(data);
		}
	
	return null;
	
	};	
	
module.exports=symfony2;	
	
	