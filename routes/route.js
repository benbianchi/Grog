module.exports = (function() {
    'use strict';
    var router = require('express').Router();

    var Ingredient = require("../models/Ingredient.js")
     //Ingredient Routes

    router.get('/store/ingredients/:id', function (req, res, next) {
    	Ingredient.findById(req.params.id, function(err, ingredient){
    		if(err) res.send(err);
    		res.json(ingredient);
    	});
    });

    router.delete('/store/ingredients/:id', function (req, res, next) {
    	console.log(req.params);
    	Ingredient.findById(req.params.id).remove(function(err) {
    		if (err)
    			console.log(err);

    	})
    		res.end();
    	
    });

    	router.get('/store/ingredients', function(req,res,next) {

    		Ingredient.find({}, function(err,list) {
    			res.json(list)});
    	});

    	router.post('/store/ingredients', function(req,res,next) {

    		var ingr;
    		
    		Ingredient.find({name:req.body.name}, function(err,list) {

    			if (req.body.pricePerMl < 0 || !req.body.archeType)
    			{
    				res.send("Error, provided information is erroneous!");
    				res.end();
    				return;
    			}
    			else
    			{
    				ingr = new Ingredient({name:req.body.name,pricePerMl:req.body.pricePerMl,archeType:req.params.archeType});
    				ingr.save(function(err)
    				{
    					if (!err)
    						return console.log("successful");
    					else
    						return console.log(err);
    				})
    			}
    			res.end();

    		});
    	});
   // End of Ingredient Routes

    return router;
})();
