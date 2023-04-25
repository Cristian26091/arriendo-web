const faq = require('../models/faq');
const faqCtrl = {};


faqCtrl.getFaqs = async (req, res) => {
    const faqs = await faq.find();
    res.json(faqs);
}

faqCtrl.getFaq = function () {

}

faqCtrl.createFaq = (req, res) =>{

}

faqCtrl.editFaq = function () {

}

faqCtrl.deleteFaq = function () {

}

module.exports = faqCtrl