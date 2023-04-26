const Region = require ('../models/region');

const regionCtrl = {};


regionCtrl.getRegions = async (req, res) => {
    const regions = await Region.find();
    res.json(regions);
}

regionCtrl.getRegion = async (req, res) => {
    const { regionId } = req.params;
    const region = await Region.findOne({ _id: regionId });
    if (!region) {
        return res.status(404).json({ message: 'Región no encontrada' });
    }
    // const comunas = region.comunas.map(comuna => comuna.nombre_comuna);
    res.json(region);
}

regionCtrl.createRegion = function() {

}

regionCtrl.editRegion = function () {

}

regionCtrl.deleteRegion = function () {

}

module.exports = regionCtrl