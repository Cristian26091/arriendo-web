const Country = require('../models/country');

const countryCtrl = {};

countryCtrl.getCountries = async (req, res) => {
    const paises = await Country.find();
    res.json(paises);
};

module.exports = countryCtrl;