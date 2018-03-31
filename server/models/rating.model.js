let mongoose = require('mongoose');

let RatingSchema = mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Rating', RatingSchema);