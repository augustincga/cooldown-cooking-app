var externalRecipesController = require('../controllers/external-recipes.controllers');

module.exports = function(app) {
    app.post('/external-api/recipes', externalRecipesController.getRecipes);
};
