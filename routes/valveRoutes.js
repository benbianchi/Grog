module.exports = (function() {
    'use strict';
    var router = require('express').Router();

     //Ingredient Routes

    router.post('/config/grog/', function (req, res, next) {
        fs = require('fs');
        fs.writeFileSync("/config/grog/",req.body,'utf8');   
            
        
    });


    return router;
})();
