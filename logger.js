/**
 * @package LogMonitor
 * @license http://www.opensource.org/licenses/mit-license.php
 * @author José Vte. Calderón Cabrera <jvcalcab@gmail.com>
 */

var logger = function(logFile) {
	this.__construct(logFile);
	};
	
	
logger.prototype.__construct = function(logFile) {		
	
	this.logFile = logFile;
	this.fs = require('fs');
	this.createLogFile();
	
	};	
	
	
logger.prototype.createLogFile = function() {
	
	if(!this.logFile)
		{
		
		this.fs.writeFile(this.logFile, '', function(error) {
			if(error) {
				console.log(error);
				}
			});
		
		}
	
	};	
	
	
logger.prototype.addMessage = function(type, message) {

	var message = '['+this.getCurrentDate()+']'+' '+type+': '+message+"\n";
	
	this.fs.appendFile(this.logFile, message, function(error) {
		if(error) {
			console.log(error);
			}
		});
	
	};	
	
	
logger.prototype.getCurrentDate = function() {
	
	var now = new Date();
	var dd = now.getDate();
	var mm = now.getMonth()+1; //January is 0!

	var yyyy = now.getFullYear();
	if(dd<10){ dd='0'+dd; } 
	if(mm<10){ mm='0'+mm; } 
	now = yyyy+'-'+mm+'-'+dd;
	
	return now;
	
	};	


logger.prototype.info = function(message) {
	this.addMessage('INFO', message);
	};
	
	
logger.prototype.error = function(message) {
	this.addMessage('ERROR', message);
	};
	
	
logger.prototype.warning = function(message) {
	this.addMessage('WARNING', message);
	};	
	
	
logger.prototype.debug = function(message) {
	this.addMessage('DEBUG', message);
	};	
	
module.exports=logger;		