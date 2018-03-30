var Recipe = require('../models/recipe.model');
let ObjectId = require('mongodb').ObjectID;


// exports.getRecipesByIngredients = function(req, res) {
// 	if (!req.body) {
// 		return res.status(500).send({message: req.body})
// 	}

// 	let ingredients = req.body.ingredients;

// 	Recipe.find({'ingredients.name':  {$all:ingredients}}, function(err, recipes){
// 		if(err) {
// 			res.status(500).send({message: "Some error occurred while searching for the Recipes."});
// 		} else if(recipes && recipes !== null) {
// 			res.status(200).send(recipes);
// 		} else {
// 			res.status(404).send({message: "Could not find recipes by requested ingredients"});
// 		}
// 	});
// };

// exports.getRecipesByFilters = function(req, res) {
// 	if(!req.body) {
// 		res.status(500).send({message: req.body});
// 	};

// 	filter = {};
// 	Object.assign(filter, req.body.filters ? {categories: req.body.filters } : null,
// 						  req.body.ingredients ? {ingredients: req.body.ingredients } : null);

// 	searchQuery = {};
// 	Object.assign(searchQuery, filter.categories ? {'categories': {$all: filter.categories} } : null,
// 						   	   filter.ingredients ? {'ingredients.name': {$all: filter.ingredients} } : null);

// 	Recipe.find(searchQuery, function(err, recipes){
// 		if(err) {
// 			res.status(500).send({message: "Some error occurred while searching for the Recipes."});
// 		} else if(recipes && recipes !== null) {
// 			res.status(200).send(recipes);
// 		} else {
// 			res.status(404).send({message: "Could not find recipes by selected filters."});
// 		}
// 	});
// };

exports.getMostRecentRecipes = function(req, res) {
	if(!req.body) {
		res.status(500).send({message: req.body});
	};

	let oneDayInterval = Date.now() / 1000 - 24*60*60;

	let searchQuery = { 
		_id: {
			$gt: ObjectId.createFromTime(oneDayInterval)
		}
	}

	Recipe.find(searchQuery, function(err, recipes){
		if(err) {
			res.status(500).send({message: "Some error occurred while searching for the Recipes."})
		} else if(recipes && recipes !== null) {
			res.status(200).send(recipes);
		} else {
			res.status(404).send({message: "Could not find the most recent recipes."});
		}
	});
};

exports.getSimilarRecipes = function(req, res) {
	if(!req.body) {
		res.status(500).send({message: req.body});
	};
	
	let ingredients = req.body.ingredients;

	Recipe.aggregate([
		{
			$addFields: {
				totalMatch: {
					$size: {
						$setIntersection: [ingredients, { $map: { input: "$ingredients", as: "ingredient", in: "$$ingredient.name" } }]
					}
				}
			}
		},
		{
			$sort: {
				totalMatch: -1
			}
		},
		{
			$project: {
				totalMatch: 0
			}
		},
		{
			$limit: 10
		}
	], function (err, recipes) {
		if (err) {
			res.status(500).send({ message: "Some error occurred while searching for the Recipes." })
		} else if (recipes && recipes !== null) {
			res.status(200).send(recipes);
		} else {
			res.status(404).send({ message: "Could not find the recipes." });
		}
	});
};


exports.getRecipesByFilters = function (req, res) {
	if (!req.body) {
		res.status(500).send({ message: req.body });
	};


	let filters = req.body.filters.length > 0 ? req.body.filters : undefined
	let ingredients = req.body.ingredients.length > 0 ? req.body.ingredients : undefined

	if (filters && ingredients) {
		Recipe.aggregate([
			{
				$match: {
					'categories': { $all: filters }
				}
			},
			{
				$addFields: {
					matchingElements: { $setIntersection: [req.body.ingredients, { $map: { input: "$ingredients", as: "ingredient", in: "$$ingredient.name" } }] }
				}
			},
			{
				$redact: {
					$cond: {
						if: { $eq: [{ $size: "$ingredients" }, { $size: "$matchingElements" }] },
						then: "$$KEEP",
						else: "$$PRUNE"
					}
				}
			},
			{
				$project: {
					matchingElements: 0
				}
			}
		], function (err, recipes) {
			if (err) {
				res.status(500).send({ message: "Some error occurred while searching for the Recipes." })
			} else if (recipes && recipes !== null) {
				res.status(200).send(recipes);
			} else {
				res.status(404).send({ message: "Could not find the recipes." });
			}
		});
	} else if (filters && !ingredients) {
		let searchQuery = { 'categories': { $all: filters } };

		Recipe.find(searchQuery, function (err, recipes) {
			if (err) {
				res.status(500).send({ message: "Some error occurred while searching for the Recipes." });
			} else if (recipes && recipes !== null) {
				res.status(200).send(recipes);
			} else {
				res.status(404).send({ message: "Could not find recipes by selected filters." });
			}
		});
	} else if (!filters && ingredients) {
		Recipe.aggregate([
			{
				$addFields: {
					matchingElements: { $setIntersection: [req.body.ingredients, { $map: { input: "$ingredients", as: "ingredient", in: "$$ingredient.name" } }] }
				}
			},
			{
				$redact: {
					$cond: {
						if: { $eq: [{ $size: "$ingredients" }, { $size: "$matchingElements" }] },
						then: "$$KEEP",
						else: "$$PRUNE"
					}
				}
			},
			{
				$project: {
					matchingElements: 0
				}
			}
		], function (err, recipes) {
			if (err) {
				res.status(500).send({ message: "Some error occurred while searching for the Recipes." })
			} else if (recipes && recipes !== null) {
				res.status(200).send(recipes);
			} else {
				res.status(404).send({ message: "Could not find the recipes." });
			}
		});
	}
}

exports.getRecipesByName = function(req, res) {
	if (!req.body) {
		res.status(500).send({ message: req.body });
	};

	let recipesName = req.body.recipesName;

	let searchQuery = {
		"title": { $regex: new RegExp(`.*${recipesName}.*`, 'i') }
	};

	Recipe.find(searchQuery, function(err, recipes){
		if(err) {
			res.status(500).send({message: "Some error occurred while searching for the Recipes."})
		} else if(recipes && recipes.length > 0) {
			res.status(200).send(recipes);
		} else {
			res.status(404).send({message: "Could not find recipes by required name."});
		}
	})
};

exports.getRecipesByAuthorId = function(req, res) {
	if (!req.body) {
		res.status(500).send({ message: req.body });
	};

	let authorId = req.body.authorId;

	let searchQuery = {
		"authorId" : authorId
	};

	Recipe.find(searchQuery, function(err, recipes){
		if(err) {
			res.status(500).send({message: "Some error occurred while searching for the Recipes."})
		} else if(recipes && recipes.length > 0) {
			res.status(200).send(recipes);
		} else {
			res.status(404).send({message: "Could not find recipes by required author."});
		}
	})
};