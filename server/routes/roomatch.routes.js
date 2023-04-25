const express = require('express');
const router = express.Router();

const faq = require('../controllers/faq.controller');
const room = require('../controllers/room.controller');
const contact = require('../controllers/contact.controller');
const region = require('../controllers/region.controller');

//ROUTES
//----------FAQ ROUTES-----------
router.get('/faq', faq.getFaqs);
// router.post('faq/', faq.createFaq);
// router.get('/faq/:id', faq.getFaq);
// router.get('/faq', faq.createFaq);
// router.put('/faq/:id', faq.editFaq);
// router.delete('faq/:id', faq.deleteFaq);

//----------ROOM ROUTES-----------
router.get('/room', room.getRooms);
router.get('/room/:idRoom', room.getRoom);
// router.post('room/', room.createRoom);
// router.put('/room/:id', room.editRoom);
// router.delete('room/:id', room.deleteRoom);

//----------CONTACT ROUTES-----------
router.get('/contact', contact.getContacts);
router.post('/contact/', contact.createContact);
// router.get('/contact/:id', room.getContact);
// router.get('/contact', room.createContact);
// router.put('/contact/:id', room.editContact);
// router.delete('contact/:id', room.deleteContact);

//----------REGION ROUTES-----------
router.get('/region', region.getRegions);


module.exports = router;