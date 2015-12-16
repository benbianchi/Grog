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
            {
    			console.log(err);
                res.sendStatus(300);
            }
            else
                res.sendStatus(200);

    	})
    		
    	
    });


    router.post('/store/ingredients/:id', function (req, res, next) {
        Ingredient.findOne({_id:req.body._id},function(err, doc) {
            console.log("Findone: "+ doc);
        })
        console.log(req.body);
        Ingredient.findOneAndUpdate({_id:req.body._id},{name:req.body.name,pricePerMl:req.body.pricePerMl,archType:req.body.archType},{upsert:false},function(err, doc) {
    if (err)
            {
                console.log(err);
            res.sendStatus(300);
            return;
            }
            else
            {
                res.sendStatus(200);
                return;
            }
        })
      
            
        
    });


    	router.get('/store/ingredients', function(req,res,next) {

    		Ingredient.find({}, function(err,list) {
    			res.json(list)});
    	});

    	router.post('/store/ingredients', function(req,res,next) {

            
    		console.log(req.body);

var ingr;
    		
    		Ingredient.find({name:req.body.name}, function(err,list) {
                
                if (err)
                    console.log(err);

    			if (req.body.pricePerMl < 0 || !req.body.archType)
    			{
    				res.send("Error, provided information is erroneous!");
    				res.end();
    				return;
    			}
    			else
    			{
    				ingr = new Ingredient({name:req.body.name,pricePerMl:req.body.pricePerMl,archType:req.body.archType});
    				ingr.save(function(err)
    				{
    					if (!err)
    						console.log("successful");
    					else
    						console.log(err);
                        return;
    				})

                    res.json(ingr);
    			}
    			res.end();

    		});
    	});
   // End of Ingredient Routes

    return router;
})();
