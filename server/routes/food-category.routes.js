var foodCategoryController = require('../controllers/food-category.controller');

module.exports = function(app) {
    app.post('/api/single-food-category', foodCategoryController.createFoodCategory);
    
    app.get('/api/food-categories', foodCategoryController.findAllFoodCategories);

	app.get('/api/food-category-id', foodCategoryController.findFoodCategoryById);
	
	app.get('/api/food-category-name', foodCategoryController.findFoodCategoryByName);
};
