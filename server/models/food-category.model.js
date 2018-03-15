let mongoose = require('mongoose');

let FoodCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    prettyName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    foodProducts: [{
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'FoodProduct'}
    }]
});

module.exports = mongoose.model('FoodCategory', FoodCategorySchema);