var mongoose = require('mongoose');

var DrinkSchema = new mongoose.Schema({
  name: String,
  author: String,
  description: String,
  upvotes:Number,
  ingredients: [{amount:Number, Type:mongoose.Schema.ObjectId}],
  instructions: Array,
  updated_at: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Drink', DrinkSchema);