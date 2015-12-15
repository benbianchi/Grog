'use strict';

// Mongo works;

var Mongoose = require('mongoose');

var IngredientSchema = new Mongoose.Schema ( { "title" : { type: String,default:'',trim:true});

var db = mongoose.createConnection('mongodb://localhost:3000/database');

var Ingredient = Mongoose.model('Ingredient',IngredientSchema)

module.exports = Ingredient;