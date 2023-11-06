const mongoose = require('mongoose');
const { Schema } = mongoose;

const InterestSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
});

module.exports =  mongoose.model('interest', InterestSchema);