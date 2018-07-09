var RecipeController = require('../../server/controllers/recipe.controller');
var request = require('request');

exports.getRecipes = function (req, res) {
	if (!req.body) {
		res.status(500).send({ message: req.body });
	};

	let recipeData = {
		recipesName: req.body.recipesName
	}

	request.post(
		'http://localhost:3001/api/recipe/getRecipesByName',
		{ json: recipeData },
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				let recipesList = [];
				body.forEach(element => {
					recipesList.push({
						recipeUrl: `localhost:3000/recipes/${element._id}`,
						recipeDescription: element.title
					})
				});
				res.status(200).send(recipesList);
			}
		}
	);
};
