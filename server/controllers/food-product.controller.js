var FoodProduct = require('../models/food-product.model.js');

exports.createSingleFoodProduct = function(req, res) {
    // Create and Save a new Food Product
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }

    let foodProduct = new FoodProduct(req.body);

    foodProduct.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Test."});
        } else {
            res.send(data);
        }
    });
};

exports.findAllFoodProducts = function(req, res) {
    // Retrieve and return all Food Products from the database.
    FoodProduct.find(function(err, foodProducts){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving notes."});
        } else {
            res.send(foodProducts);
        }
    });
};