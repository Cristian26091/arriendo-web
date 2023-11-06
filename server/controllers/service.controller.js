const Service = require('../models/service');
const serviceCtrl = {};

serviceCtrl.getServices = async (req, res) => {
    const services = await Service.find();
    res.json(services);
}

serviceCtrl.getService = async (req, res) => {
    try {
        const house = await Service.findById(req.params.idService);
    res.json(house);
    }catch(err) {
        console.log(err);
    }
}

module.exports = serviceCtrl;