var FoodCategory = require('../models/food-category.model');

// Create and Save a new Food Category
exports.createFoodCategory = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }

    let foodCategory = new FoodCategory(req.body);

    foodCategory.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while adding the Food Category."});
        } else {
            res.status(200).send(data);
        }
    });
};

// Retrieve and return all Food Categories from the database.
exports.findAllFoodCategories = function(req, res) {
    FoodCategory.find(function(err, foodCategories){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving the Food Categories."});
        } else {
            res.status(200).send(foodCategories);
        }
    });
};

// Retrieve and return Food Category by id
exports.findFoodCategoryById = function(req, res) {
    FoodCategory.findById({_id: req.body.id}, function(err, foodCategory){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving the Food Category."});
        } else if(foodCategory){
            res.status(200).send(foodCategory);
        } else {
			res.status(404).send({message: "The Food Category you are searching for couldn`t been found."})
		}
    });
};

// Retrieve and return Food Category by name
exports.findFoodCategoryByName = function(req, res) {
	FoodCategory.findOne({name: req.body.name}, function(err, foodCategory){
		if(err) {
			console.log(err);
			res.status(500).send({message: "Some error occurred while retrieving the Food Category."})
		} else if(foodCategory && foodCategory !== null) {
			res.status(200).send(foodCategory);
		} else {
			res.status(404).send({message: "The Food Category you are searching for couldn`t been found."});
		}
	})
}