const Help = require ('../models/help');

const helpCtrl = {};

helpCtrl.getHelps = async (req, res) => {
    const helps = await Help.find();
    res.json(helps);
}

helpCtrl.getHelp = async (req, res) => {
    const help = await Help.findById(req.params.id);
    res.json(help);
}


module.exports = helpCtrl;