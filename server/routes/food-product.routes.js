var foodProductController = require('../controllers/food-product.controller.js');

module.exports = function(app) {
    // Create a single Food Product
    app.post('/api/single-food-product', foodProductController.createSingleFoodProduct);

    // Create multiple Food Products at once
    // app.post('/multiple-food-products', foodProductController.createMultipleFoodProducts);
    
    // Retrieve all Food Products
    app.get('/api/food-products', foodProductController.findAllFoodProducts);

    // Retrieve a single Food Product by id
    // app.get('/food-product/:foodProductId', test.findOneFoodProductById);

    // Update a Food Product by id
    // app.put('/food-product/:foodProductId', test.updateOneFoodProductById);

    // Delete a Food Product by id
    // app.delete('/food-product/:noteId', test.deleteOneFoodProductById);
};
