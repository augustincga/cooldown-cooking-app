let utilController = require('../controllers/util.controller.js');

module.exports = function(app){
    app.post('/api/populate-food-product-category-collections', utilController.populateFoodProductCategoryCollections);
    app.post('/api/populate-recipe-collection', utilController.populateRecipeCollection);
};