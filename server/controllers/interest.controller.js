const Interest = require('../models/interest');

const interestCtrl = {};

interestCtrl.getInterests = async (req, res) => {
    const intereses = await Interest.find();
    res.json(intereses);
}

module.exports = interestCtrl;