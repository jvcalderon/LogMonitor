/**
 * @package LogMonitor
 * @license http://www.opensource.org/licenses/mit-license.php
 * @author José Vte. Calderón Cabrera <jvcalcab@gmail.com>
 */

var config = require('./config.json');

var logger = require('./logger.js');
logger = new logger(config.appLogFile);

var spawn = require('child_process').spawn;

var tails = new Array();
var dataHandlers = new Array();


/*APP*******************************************************/

for(key in config.logsToTail)
	{
	
	tails.push(spawn('tail', ['-f', config.logsToTail[key].logFile]));
	
	dataHandlers[key] = require('./handler/dataHandler/'+config.logsToTail[key].dataHandler+'.js');
	dataHandlers[key] = new dataHandlers[key](config.logsToTail[key].name, logger, config);
	
	tails[key].stdout.on('data', function(data){
		dataHandlers[key].handle(data.toString());
	});
	
	}