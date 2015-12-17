module.exports = (function() {
    'use strict';
    var router = require('express').Router();

    var Ingredient = require("../models/Ingredient.js")

    var Drink = require("../models/Drink.js")


   // Config Routes:

    router.post('/config/grog.json/', function (req, res, next) {
        console.log("Write to grog.json");
        var fs = require('fs');
        fs.writeFileSync("public/config/grog.json",JSON.stringify(req.body),'utf8');   
            
        
    });
    // End of Config Routes
    
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
            
            Ingredient.find({_id:req.body._id}, function(err,list) {
                
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
   // 


    //Drink Routes:
   router.get('/store/drinks/:id', function (req, res, next) {
        Drink.findById(req.params.id, function(err, drink){
            if(err) res.send(err);
            res.json(drink);
        });
    });

    router.delete('/store/drinks/:id', function (req, res, next) {
        console.log(req.params);
        Drink.findById(req.params.id).remove(function(err) {
            if (err)
            {
                console.log(err);
                res.sendStatus(300);
            }
            else
                res.sendStatus(200);

        })
            
        
    });


    router.post('/store/drinks/:id', function (req, res, next) {
            console.log("\n\n"+JSON.stringify(req.body.ingredients)+"\n\n");
               var drink = {
        name:req.body.name, 
        author:req.body.author,
        description:req.body.description,
        ingredients:req.body.ingredients,
        instructions:req.body.instructions
         };
         console.log(req.body);


        // Drink.findOne({},function(err, doc) {
        //     console.log("Findone: "+ doc);
        // })
        console.log("req.body: "+JSON.stringify(req.body));
        Drink.findOneAndUpdate({_id:req.body._id},drink,{upsert:false},function(err, doc) {
    if (err)
            {
                console.log(err);
            res.sendStatus(300);
            return;
            }
            else
            {
                console.log("successful!");
                console.log(doc);
                res.sendStatus(200);
                return;
            }
        })
      
            
        
    });


        router.get('/store/drinks', function(req,res,next) {

            Drink.find({}, function(err,list) {
                console.log(list);
                res.json(list)});
        });

        router.post('/store/drinks', function(req,res,next) {

     
            var drink;
            console.log(req.body);


            
 

                    drink = new Drink(req.body);
                    console.log(drink);
                    drink.save(function(err)
                    {
                        if (!err)
                            console.log("successful");
                        else
                            console.log(err);
                        return;
                    })

                    res.json(drink);
                

            });


    //End of Drink Routes

    //Begin Other Routes

function checkForValue(json, value) {

   if (json.type != 0)
   {
        if (json == value)
            return true;
        else
            return false;
   }
}

function arrUnique(arr) {
    var cleaned = [];
    arr.forEach(function(itm) {
        var unique = true;
        cleaned.forEach(function(itm2) {
            if (_.isEqual(itm, itm2)) unique = false;
        });
        if (unique)  cleaned.push(itm);
    });
    return cleaned;
}




    router.get('/store/getAvailableDrinks/', function(req,res,next) {

                var fs = require('fs');
        var valves =JSON.parse(fs.readFileSync("public/config/grog.json",'utf8'));
        var avD = [];
        var arr = [];
        for (var i = valves.length - 1; i >= 0; i--) {
            if (valves[i].type!=0)
            arr.push(valves[i].type);

        };
      


        Drink.find({ "ingredients.Type" : { $in:arr}}, function(err,docs) {
            
            res.json(docs);
        });


        });

    return router;
})();
