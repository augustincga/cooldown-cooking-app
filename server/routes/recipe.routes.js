var recipeController = require('../controllers/recipe.controller')

module.exports = function(app){
	//params - ingredientsp[]
	// app.post('/api/recipe/getRecipesByIngredients', recipeController.getRecipesByIngredients);

	//params - filters [], ingredients []
	// app.post('/api/recipe/getRecipesByFilters', recipeController.getRecipesByFilters)

	app.get('/api/recipe/getMostRecentRecipes', recipeController.getMostRecentRecipes)

	//params - ingredients []
	app.post('/api/recipe/getSimilarRecipes', recipeController.getSimilarRecipes)

	//params - filters [], ingredients []
	//Find Recipes based on all requested filters and containing all or some of the requested ingredients
	app.post('/api/recipe/getRecipesByFilters', recipeController.getRecipesByFilters)

	//params - recipesName String
	app.post('/api/recipe/getRecipesByName', recipeController.getRecipesByName)

	//params - authorId String
	app.post('/api/recipe/getRecipesByAuthor', recipeController.getRecipesByAuthorId)

	//params - authorId String
	app.post('/api/recipe/addNewRecipe', recipeController.addNewRecipe)
}