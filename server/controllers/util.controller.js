var FoodProduct = require('../models/food-product.model.js');
var FoodCategory = require('../models/food-category.model');

exports.populateFoodProductCategoryCollections = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }

    let fs = require('fs');
    let foodProductsByCategory = JSON.parse(fs.readFileSync('assets/ingredients-by-category.json', 'utf8'));
    let foodProductsByCategoryList = foodProductsByCategory.list;

    foodProductsByCategoryList.forEach(function(category, index){
        category.ingredients.forEach(function(product, subindex){
            let foodProductItem = {
                name: product.name,
                prettyName: product.name.charAt(0).toUpperCase() + product.name.slice(1).toLowerCase()
            };
            new FoodProduct(foodProductItem).save();
        });
    });

    FoodProduct.find(function(err, foodProductList) {
        var foodProductMap = {};
        for(let i = 0; i < foodProductList.length; i++) {
            let foodProduct = foodProductList[i];
            foodProductMap[foodProduct.name] = foodProduct.id;
        }

        foodProductsByCategoryList.forEach(function(category, index){
            let categoryProductItem = {
                name: category.category,
                prettyName: category.category,
                image: category.category_img,
                foodProducts: []
            };
            category.ingredients.forEach(function(product, subindex){
                categoryProductItem.foodProducts.push({"id": foodProductMap[product.name]});
            });
            new FoodCategory(categoryProductItem).save();
        });
    });
};