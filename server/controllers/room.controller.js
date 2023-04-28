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

// Devover infomarción filtrada respecto a la requests (en desarrollo)
roomCtrl.getRoomByFilter = async (req, res) => {
    const { disponible, region, comuna, tipoVivienda }  = req.query;
    const filtro = {};

    if (disponible) {
        filtro.disponible = disponible === true;
    }

    if (region) {
        filtro.region = region;
    }

    if (comuna) {
        filtro.comuna = comuna;
    }

    if (tipoVivienda){
        filtro.tipoVivienda = tipoVivienda;
    }

    const rooms = await Room.find(filtro);

    res.json(rooms);

}

roomCtrl.createRoom = (req, res) =>{
    
}

roomCtrl.editRoom = function () {

}

roomCtrl.deleteRoom = function () {

}


module.exports = roomCtrl;