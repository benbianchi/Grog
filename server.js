 var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    mongoose.connect('mongodb://localhost/grog');

    var express = require('express');
    var app = express();
    app.use(bodyParser()); 
    app.use(express.static(__dirname + '/public'));
    var routes = require('./routes/route.js');
	app.use('/', routes);

    app.get('/', function (req, res) {
    	res.sendFile("index.html", {"root": __dirname+"/view"});
    });


  

    	var server = app.listen(3000, function () {
    		var host = server.address().address;
    		var port = server.address().port;

    		console.log('Example app listening at http://%s:%s', host, port);
    	});