let mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    userFollowers: [{
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }],
    usersFollowing: [{
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }],
    addedRecipeReviews: [{
        recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}
    }],
    addedUserReviews: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        reviewId: {type: mongoose.Schema.Types.ObjectId, ref: 'Review'}
    }],
    receivedReviews: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        reviewId: {type: mongoose.Schema.Types.ObjectId, ref: 'Review'}
    }],
    addedRecipeRatings: [{
        recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
    }],
    addedUserRatings: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        ratingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}
    }],
    receivedRatings: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        ratingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}
    }],
    ownRecipes: [{
        recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}
    }],
    recipesFollowing: [{
        recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}
	}],
	savedForLaterRecipes: [{
        recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}
    }],
    alreadyCookedRecipes: [{
        recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
        personalSpecifications: {
            ocasion: String,
            date: Date,
            additionalNotes: [String],
            recipeChangesNotes: [String]
        } 
    }],
    googleSearchedRecipes: [{
        date: {
			type: Date,
			default: Date.now
		},
        uploadedImgUrl: String,
        urlResult: String,
    }],
});

module.exports = mongoose.model('User', UserSchema);