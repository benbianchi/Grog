var mongoose = require('mongoose');

var ValveSchema = new mongoose.Schema({
  index: String,
  ingredient: mongoose.Schema.ObjectId,
  amount: Number

});

module.exports = mongoose.model('Valve', ValveSchema);