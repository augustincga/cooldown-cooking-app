let mongoose = require('mongoose');

let RecipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    cookingSteps: [String],
    preparationTime: {
        type: String
    },
    cookingTime: {
        type: String,
    },
    servings: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    nutrients: {
        calories: Number,
        carbohydrates: String,
        protein: String,
        fat: String
    },
    author: {
        type: String,
        required: true
    },
    smallImage: String,
    largeImage: String,
    ingredients: [{
        name: {type: String, required: true},
        amount: {type: String, required: true},
        unit: {type: String, required: true},
    }],
    categories: [String],
    receivedReviews: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        reviewId: {type: mongoose.Schema.Types.ObjectId, ref: 'Review'}
    }],
    receivedRatings: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        ratingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}
    }],
});

module.exports = mongoose.model('Recipe', RecipeSchema);