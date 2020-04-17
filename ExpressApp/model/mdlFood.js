var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: Number,
    type: Number,
    score: Number,
    createDate: Date,
    updateDate: Date
});

module.exports = mongoose.model('food', foodSchema)