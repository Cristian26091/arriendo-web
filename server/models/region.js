const mongoose = require('mongoose');
const { Schema } = mongoose;

const RegionSchema = new Schema({
    numero: { type: String, required: true },
    nombre_region: { type: String, required: true },
    comunas: [{
        nombre_comuna: { type: String, required: true }
    }]
});

module.exports = mongoose.model('region', RegionSchema);