let mongoose = require('mongoose');

let IngredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
	},
	image: {
		type: String,
	}
});

module.exports = mongoose.model('Ingredient', IngredientSchema);