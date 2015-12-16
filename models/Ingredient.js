var mongoose = require('mongoose');

var IngredientSchema = new mongoose.Schema({
  name: String,
  pricePerMl: Number,
  archType: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ingredient', IngredientSchema);