let userController = require('../controllers/user.controller.js');

module.exports = function(app){
	
	app.post('/api/user/register', userController.registerUser);
	
	app.post('/api/user/login', userController.loginUser);
	
	app.post('/api/user/saveRecipeForLater', userController.saveRecipeForLater);

	app.post('/api/user/removeSavedForLaterRecipe', userController.removeSavedForLaterRecipe);
	
	app.get('/api/user/getSavedForLaterRecipes/:userId', userController.getSavedForLaterRecipes);

	app.post('/api/user/saveGoogleSearch', userController.saveGoogleSearch);

	app.post('/api/user/addRecipeAsCooked', userController.addRecipeAsCooked);

	app.post('/api/user/removeRecipeFromCooked', userController.removeRecipeFromCooked);

	app.post('/api/user/updateCookedRecipe', userController.updateCookedRecipe);
	
};