var foodProductController = require('../controllers/food-product.controller.js');

module.exports = function(app) {
    // Create a single Food Product
    app.post('/api/single-food-product', foodProductController.createSingleFoodProduct);
    
    // Retrieve all Food Products
    app.get('/api/food-products', foodProductController.findAllFoodProducts);

	app.post('/api/food-product-id', foodProductController.findFoodProductById);

	app.post('/api/food-product-name', foodProductController.findFoodProductByName);
	
	app.post('/api/food-products-suggestion', foodProductController.findFoodProductIncludingString);
};
