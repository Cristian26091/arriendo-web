const region = require ('../models/region');
const regionCtrl = {};

regionCtrl.getRegions = async (req, res) => {
    const regions = await region.find();
    res.json(regions);
}

regionCtrl.getRegion = function () {

}

regionCtrl.createRegion = function() {

}

regionCtrl.editRegion = function () {

}

regionCtrl.deleteRegion = function () {

}

module.exports = regionCtrl