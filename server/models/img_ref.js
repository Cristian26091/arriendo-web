const mongoose = require('mongoose');
const { Schema } = mongoose;

const Img_refSchema = new Schema({
    nombre: { type: String, required: true },
    url: { type: String, required: true },
});

module.exports = mongoose.model('img_ref', Img_refSchema);