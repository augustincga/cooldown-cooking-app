var FoodProduct = require('../models/food-product.model.js');
var FoodCategory = require('../models/food-category.model');
var Recipe = require('../models/recipe.model.js')
var Ingredient = require('../models/ingredient.model');

exports.populateRecipeCollection = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }

    let fs = require('fs');
    let recipesApetizers = JSON.parse(fs.readFileSync('assets/dataset/crawled-recipes/crawled_recipes_apetizers.json', 'utf8'));
    let recipesList = recipesApetizers.recipes;

    recipesList.forEach(function(recipe, index){
        let recipeItem = {
            title: recipe.title,
            cookingSteps: [],
            prepartionTime: recipe.prepTime,
            cookingTime: recipe.cookTime,
            servings: recipe.servings,
            nutrients: {
                calories: recipe.calories,
                carbohydrates: recipe.carbs,
                protein: recipe.protein,
                fat: recipe.fat
            },
            author: recipe.calories_url,
            smallImage: recipe.smallImg,
            largeImage: recipe.largeImg,
            ingredients: [],
            categories: [recipe.categories],
        }
        
        if(recipe.instructions === undefined) {
            console.log(recipe.title)
        } else {
            recipe.instructions.forEach(function(instructionStep){
                recipeItem.cookingSteps.push(instructionStep.name);
            })
        }


        if(recipe.ingredients === undefined) {
            console.log(recipe.title)
        } else {
            recipe.ingredients.forEach(function(ingredient){
                recipeItem.ingredients.push({
                    name: ingredient.name,
                    amount: ingredient.value,
                    unit: ingredient.unit
                })
            })
        }

        new Recipe(recipeItem).save();
    });
};

exports.populateFoodProductCategoryCollections = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }

    let fs = require('fs');
    let foodProductsByCategory = JSON.parse(fs.readFileSync('assets/dataset/crawled-ingredients/ingredients-by-category.json', 'utf8'));
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

exports.populateIngredientCollectionFromRecipeCollection = function(req, res) {
	Recipe.distinct('ingredients.name', function(err, ingredients){
		if(err) {
			res.status(500).send({message: err});
		} else {
			ingredients.forEach(function(ingredient){
				new Ingredient({name: ingredient}).save();
			});
		}
	});
};
