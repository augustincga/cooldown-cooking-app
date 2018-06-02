var passwordHash = require('password-hash');

var User = require('../models/user.model.js');
var Recipe = require('../models/recipe.model')

exports.registerUser = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }

    let processedUser = req.body;
    processedUser.password = passwordHash.generate(processedUser.password);

    let user = new User(processedUser);

	User.findOne({email: req.body.email}, function(err, data){
		if(err) {
			console.log(err);
			res.status(500).send({message: "Some error occurred while trying to register."});
		} else if(data === null) {
			user.save();
			res.status(200).send(user);
		} else {
			res.status(422).send({message: "E-mail address already exists. Please choose another one."})
		}
	});
};

exports.loginUser = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }

    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "There was an error trying to login."});
        } else if(user !== null && passwordHash.verify(req.body.password, user.password)){
            res.status(200).send(user);
        } else {
            res.status(403).send({message: "Credentials do not match."});
        }
    });
};

exports.addRecipeAsCooked = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
	}

	let data = {
		recipeId: req.body.recipeId,
		personalNotes: req.body.personalNotes
	}

	let userId = req.body.userId;

	User.findOneAndUpdate({ _id: userId }, { $push: { alreadyCookedRecipes: data } }, {new: true}, function(err, user){
        if(err) {
            console.log(err);
            res.status(500).send({message: "There was an error trying to add the recipe to already cooked list."});
        } else {
			res.status(200).send(user);
		}
	});
}

exports.removeRecipeFromCooked = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
	}

	let recipe = {recipeId: req.body.recipeId};
	let userId = req.body.userId;

	User.findOneAndUpdate({ _id: userId }, { $pull: { alreadyCookedRecipes: recipe} }, {new: true}, function(err, user){
        if(err) {
            console.log(err);
            res.status(500).send({message: "There was an error trying to remove the recipe from cooked list."});
        } else {
			res.status(200).send(user);
		}
	});
}

exports.updateCookedRecipe = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
	}

	let recipeId = req.body.recipeId
	let userId = req.body.userId;
	let personalNotes = req.body.personalNotes;

	User.findOneAndUpdate({ _id: userId, "alreadyCookedRecipes.recipeId": recipeId}, { $set : { 'alreadyCookedRecipes.$.personalNotes' : personalNotes}}, {new: true}, function(err, user){
        if(err) {
            console.log(err);
            res.status(500).send({message: "There was an error trying to update the recipe from cooked list."});
        } else {
			res.status(200).send(user);
		}
	});
}

exports.saveRecipeForLater = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
	}

	let recipe = {recipeId: req.body.recipeId}
	let userId = req.body.userId

	User.findOneAndUpdate({ _id: userId }, { $push: { savedForLaterRecipes: recipe } }, {new: true}, function(err, user){
        if(err) {
            console.log(err);
            res.status(500).send({message: "There was an error trying to add the recipe to saved for later list."});
        } else {
			res.status(200).send(user);
		}
	});
};

exports.removeSavedForLaterRecipe = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
	}

	let recipe = {recipeId: req.body.recipeId}
	let userId = req.body.userId

	User.findOneAndUpdate({ _id: userId }, { $pull: { savedForLaterRecipes: recipe } }, {new: true}, function(err, user){
        if(err) {
            console.log(err);
            res.status(500).send({message: "There was an error trying to remove the recipe from saved for later list."});
        } else {
			res.status(200).send(user);
		}
	});
};

exports.getSavedForLaterRecipes = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
	}

	let userId = req.params.userId

	User.find({ _id: userId }, 'savedForLaterRecipes', function(err, list){
        if(err) {
            console.log(err);
            res.status(500).send({message: "There was an error trying to get the saved for later recipes list."});
        } else {
			let recipeIdsList = [];
			list[0].savedForLaterRecipes.forEach(function(recipe){
				recipeIdsList.push(recipe.recipeId);
			})
			Recipe.find({ _id: { $in: recipeIdsList } }, function (err, recipes) {
				if(err) {
					console.log(err);
					res.status(500).send({message: "There was an error trying to get the saved for later recipes list."});
				} else {
					res.status(200).send(recipes);
				}
			});
		}
	});
}

exports.saveGoogleSearch = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
	}

	let dataObject = {
		uploadedImgUrl: req.body.uploadedImgUrl,
        urlResult: req.body.urlResult,
	}

	let searchQuery = {
		_id: req.body.userId
	}

	User.findOneAndUpdate(searchQuery, { $push: { googleSearchedRecipes: dataObject } }, {new: true}, function(err, user){
        if(err) {
            console.log(err);
            res.status(500).send({message: "There was an error trying to get the saved for later recipes list."});
        } else {
			res.status(200).send(user);
		}
	});
}