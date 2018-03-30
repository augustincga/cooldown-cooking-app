let userController = require('../controllers/user.controller.js');

module.exports = function(app){
    app.post('/api/user/register', userController.registerUser);
    app.post('/api/user/login', userController.loginUser);
    app.post('/api/user/save-recipe-for-later', userController.saveRecipeForLater);
    app.post('/api/user/get-saved-for-later-recipes-list', userController.getSavedForLaterRecipes);
};