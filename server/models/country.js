const mongoose = require('mongoose');
const { Schema } = mongoose;

const CountrySchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },

});

module.exports =  mongoose.model('country', CountrySchema);