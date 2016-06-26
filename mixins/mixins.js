	var log4js = require("log4js");
 	log4js.loadAppender('file')
	log4js.addAppender(log4js.appenders.file('logs/debug.log'), 'GROG'); var log = log4js.getLogger('app');
 	var log = log4js.getLogger('GROG')
 	log.setLevel('ALL');

module.exports = log;
