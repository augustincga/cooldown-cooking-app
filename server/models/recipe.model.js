let mongoose = require('mongoose');

let RecipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    cookingSteps: {
        type: String,
        required: true
    },
    cookingTime: {
        type: Number,
    },
    servings: {
        type: Number,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    ingredients: [{
        name: {type: String, required: true},
        amount: {type: Number, required: true},
        unit: {type: String, required: true},
    }],
    categories: [String],
    receivedReviews: [{
        userId: {type: mongoose.Schema.Types.Object, ref: 'User'},
        reviewId: {type: mongoose.Schema.Types.ObjectId, ref: 'Review'}
    }],
    receivedRatings: [{
        userId: {type: mongoose.Schema.Types.Object, ref: 'User'},
        ratingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}
    }],
});

module.exports = mongoose.model('Recipe', RecipeSchema);