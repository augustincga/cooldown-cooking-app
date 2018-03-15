let mongoose = require('mongoose');

let ReviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Review', ReviewSchema);