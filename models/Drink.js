var mongoose = require('mongoose');

var DrinkSchema = new mongoose.Schema({
  name: String,
  author: String,
  description: String,
  upvotes:Number,
  ingredients: Array,
  instructions: Array,
  updated_at: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Drink', DrinkSchema);