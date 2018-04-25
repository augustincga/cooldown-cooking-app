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
	authorId: {
		type: String
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
		title: {
			type: String,
			required: true
		},
		content: {
			type: String
		},
		createdDate: {
			type: Date,
			default: Date.now()
		},
		userName: {
			type: String, 
			required: true
		},
		userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	}],
	
    receivedRatings: [{
		score: {
			type: Number,
			required: true
		},
		createdDate: {
			type: Date,
			default: Date.now()
		},
		userName: {
			type: String, 
			required: true
		},
		userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    }],
});

module.exports = mongoose.model('Recipe', RecipeSchema);