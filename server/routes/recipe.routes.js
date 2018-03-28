var recipeController = require('../controllers/recipe.controller')

module.exports = function(app){
	app.post('/api/recipes-by-ingredients', recipeController.findRecipeByIngredients);
}