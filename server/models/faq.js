//const { response } = require('express');

const mongoose = require('mongoose');
const { Schema } = mongoose;

 const FaqSchema = new Schema({
    question: { type: String, required: true },
    response: { type: String, required: true }
});

module.exports =  mongoose.model('faq', FaqSchema);