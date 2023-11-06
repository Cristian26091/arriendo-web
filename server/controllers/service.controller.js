const Service = require('../models/service');
const serviceCtrl = {};

serviceCtrl.getServices = async (req, res) => {
    const services = await Service.find();
    res.json(services);
}

serviceCtrl.getService = async (req, res) => {
    console.log(req.body);
}

module.exports = serviceCtrl;