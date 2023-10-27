const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer(); // Configuración básica de multer para procesar archivos

const room = require('../controllers/room.controller');
const contact = require('../controllers/contact.controller');
const region = require('../controllers/region.controller');
const user = require('../controllers/user.controller');
const help = require('../controllers/help.controller');
const booking = require('../controllers/booking.controller');
const house = require('../controllers/house.controller');

// ----------- HELP ROUTES -----------
router.get('/help', help.getHelps);

//----------ROOM ROUTES-----------
router.get('/room', room.getRooms);
router.get('/room/:idRoom', room.getRoom);
router.get('/filterRooms', room.getRoomByFilter);
router.delete('/room/:idRoom', room.deleteRoom);
router.get('/filterRoomsResults', room.filterRoomsByResults);
router.post('/uploadRoom',room.createRoom);

//----------ROOM BUCKET ROUTES-----------
router.post('/uploadModel',upload.single('model'), room.uploadModelToBucket);
router.delete('/deleteModel/models/:folder/:file', room.deleteModelFromBucket);
router.post('/uploadImages',upload.array('images'), room.uploadImageToBucket);
router.delete('/deleteImages/room-image-cover/:folder/:file', room.deleteImagesFromBucket);
router.post('/uploadTexture',upload.single('texture'), room.uploadTextureToBucket);
router.delete('/deleteTexture/textures/:file', room.deleteTextureFromBucket);


//----------CONTACT ROUTES-----------
router.get('/contact', contact.getContacts);
router.post('/contact/', contact.createContact);

//----------REGION ROUTES-----------
router.get('/region', region.getRegions);

//----------USER ROUTES-----------
router.get('/user', user.getUsers);
router.get('/user/:idUser', user.getUser);  
router.post('/user', user.createUser);
router.post('/user/login', user.login);
router.delete('/user/:idUser', user.deleteUser);

//----------BOOKING ROUTES-----------
router.get('/booking', booking.getBookings);
router.get('/booking/:idBooking', booking.getBooking);
router.get('/booking/user/:idUser', booking.getBookingByUser);
router.get('/booking/room/:idRoom', booking.getBookingByRoom);
router.post('/booking', booking.createBooking);
router.put('/booking/:idBooking', booking.editBooking);
router.delete('/booking/:idBooking', booking.deleteBooking);

//----------HOUSE ROUTES-----------
router.get('/house', house.getHouses);
router.get('/house/:idHouse', house.getHouse);
router.post('/house', house.createHouse);
router.put('/house/:idHouse', house.editHouse);
router.delete('/house/:idHouse', house.deleteHouse);



module.exports = router;