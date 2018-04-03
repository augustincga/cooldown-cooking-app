let ingredientController = require('../controllers/ingredient.controller');

module.exports = function(app){
	app.get('/api/ingredient/getIngredients', ingredientController.getIngredients);
};