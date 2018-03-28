var Recipe = require('../models/recipe.model');

exports.findRecipeByIngredients = function(req, res) {
	if (!req.body) {
		return res.status(500).send({message: req.body})
	}

	let ingredients = req.body.ingredientsName;

	Recipe.find({'ingredients.name':  {$all:ingredients}}, function(err, recipes){
		if(err) {
			res.status(500).send({message: "Some error occurred while searching for the Recipes."});
		} else if(recipes && recipes !== null) {
			res.status(200).send(recipes);
		} else {
			res.status(404).send("Could not find recipes by requested ingredients");
		}
	});
};