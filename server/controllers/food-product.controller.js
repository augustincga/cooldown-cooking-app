var FoodProduct = require('../models/food-product.model.js');

// Create and Save a new Food Product
exports.createSingleFoodProduct = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }

    let foodProduct = new FoodProduct(req.body);

    foodProduct.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while adding the Food Product."});
        } else {
            res.status(200).send(data);
        }
    });
};

// Retrieve and return all Food Products from the database.
exports.findAllFoodProducts = function(req, res) {
    FoodProduct.find(function(err, foodProducts){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving the Food Products."});
        } else {
            res.status(200).send(foodProducts);
        }
    });
};

// Retrieve and return Food Product by id
exports.findFoodProductById = function(req, res) {
    FoodProduct.findById({_id: req.body.id}, function(err, foodProduct){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving the Food Product."});
        } else if(foodProduct){
            res.status(200).send(foodProduct);
        } else {
			res.status(404).send({message: "The Food Product you are searching for couldn`t been found."})
		}
    });
};

// Retrieve and return Food Product by name
exports.findFoodProductByName = function(req, res) {
	FoodProduct.findOne({name: req.body.name}, function(err, foodProduct){
		if(err) {
			console.log(err);
			res.status(500).send({message: "Some error occurred while retrieving the Food Product."})
		} else if(foodProduct && foodProduct !== null) {
			res.status(200).send(foodProduct);
		} else {
			res.status(404).send({message: "The Food Product you are searching for couldn`t been found."});
		}
	})
}

// Retrieve and return all Food Products which contains certain string
exports.findFoodProductIncludingString = function(req, res) {
	FoodProduct.find({name: {$regex : `.*${req.body.name}.*`}}, function(err, foodProduct){
        if(err) {
			console.log(err);
			res.status(500).send({message: "Some error occurred while retrieving the Food Product."})
		} else if(foodProduct && foodProduct !== null) {
			res.status(200).send(foodProduct);
		} else {
			res.status(404).send({message: "The Food Product you are searching for couldn`t been found."});
		}
	})
}