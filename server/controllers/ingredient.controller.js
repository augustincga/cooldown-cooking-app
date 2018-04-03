var Ingredient = require('../models/ingredient.model')

exports.getIngredients = function(req, res) {
	Ingredient.find({}, function(err, ingredients){
		if(err) {
			res.status(500).send({message: "Some error occurred while trying to get the ingredients."});
		} else {
			res.status(200).send(ingredients);
		}
	});
};