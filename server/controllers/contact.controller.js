const Contact = require('../models/contact');
const contactCtrl = {};


contactCtrl.getContacts = async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
}

contactCtrl.createContact = async (req, res) =>{
    const contact = new Contact(req.body);
    await contact.save();
    res.json({
        'status': 'Contacto saved'
    });
}

contactCtrl.editContact = async (req, res) =>{
    
}

contactCtrl.deleteContact = function () {

}

module.exports = contactCtrl;