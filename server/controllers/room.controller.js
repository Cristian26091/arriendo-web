const Room = require('../models/room');
const roomCtrl = {};

roomCtrl.getRooms = async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
}

roomCtrl.getRoom = async (req, res) => {
    const room = await Room.findById(req.params.idRoom);
    res.json(room);
}

roomCtrl.createRoom = (req, res) =>{
    
}

roomCtrl.editRoom = function () {

}

roomCtrl.deleteRoom = function () {

}


module.exports = roomCtrl;