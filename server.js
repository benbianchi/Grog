var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var morgan = require("morgan");
var log = require('./mixins/mixins.js')
var program = require("commander")
mongoose.connect('mongodb://localhost/grog', function(err) {
    if (err)
        log.error("Unable to connect to Database");
    else
        log.info("Connected to database");
});


program.version('0.0.2')
program.option('-d --dump','Dump Database');
program.parse(process.argv);

if (program.dump) {
var i =0;
    var Ingredient = require("./models/Ingredient.js")
    var Drink = require("./models/Drink.js");
    var Valve = require("./models/Valve.js");

    Valve.find({}, function(err,list) {
    log.info("Dumping Valves...")
            log.info(list)
            i++;
        if (i==3)
            process.exit()
    });
    Ingredient.find({}, function(err,list) {
    log.info("Dumping Ingredients...")
        log.info(list)
        i++;
        if (i==3)
            process.exit()
    });
    Drink.find({}, function(err,list) {
    log.info("Dumping Drinks...")
        log.info(list)
        i++;
        if (i==3)
            process.exit()

    });

}
    


var express = require('express');
var app = express();
app.use(bodyParser()); 
app.use(express.static(__dirname + '/public'));
var routes = require('./routes/grogRoutes.js');

log.info("Binding Routes to Server...")
app.use('/', routes);

app.get('/', function (req, res) {
	res.sendFile("pages/index.html", {"root": __dirname+"/public"});
});

app.get('/configuration.html', function (req, res, next) {

            res.sendFile("pages/configuration.html", {"root": __dirname+"/public"});
    });




	var server = app.listen(3000, function () {
		var host = server.address().address;
		var port = server.address().port;

		log.info('Grog listening at http://%s:%s', host, port);
	});



process.on('SIGTERM', function () {
    log.info("Shutdown Initiating...")
  server.close(function () {
    log.info("Shutdown Complete.")
    process.exit(0);
  });
});

process.on('SIGINT', function () {
  log.info("Shutdown...")
  server.close()
  process.exit(0);

});