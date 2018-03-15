let mongoose = require('mongoose');

let FoodProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    prettyName: {
        type: String,
        required: true
    },
    nutrients: [{
        name: {type:String, required: true},
        prettyName: String,
        unit: String,
        amount: {type:String, required: true},
        percentOfDailyNeeds: String
    }]
});

module.exports = mongoose.model('FoodProduct', FoodProductSchema);