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
        recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
        reviewId: {type: mongoose.Schema.Types.ObjectId, ref: 'Review'}
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
        ratingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}
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
        date: Date,
        uploadedImg: String,
        urlResult: String,
    }],
    // dashboard: [{

    // }]
});

module.exports = mongoose.model('User', UserSchema);