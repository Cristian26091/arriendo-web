const express = require('express');
const router = express.Router();

const room = require('../controllers/room.controller');
const contact = require('../controllers/contact.controller');
const region = require('../controllers/region.controller');
const user = require('../controllers/user.controller');
const help = require('../controllers/help.controller');

// ----------- HELP ROUTES -----------
router.get('/help', help.getHelps);

//----------ROOM ROUTES-----------
router.get('/room', room.getRooms);
router.get('/room/:idRoom', room.getRoom);
router.get('/filterRooms', room.getRoomByFilter);
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

//----------USER ROUTES-----------
router.get('/user', user.getUsers);
router.get('/user/:idUser', user.getUser);  
router.post('/user', user.createUser);
router.post('/user/login', user.login);


module.exports = router;