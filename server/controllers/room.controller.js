const Room = require('../models/room');
const roomCtrl = {};

// Devolver todas las habitaciones
roomCtrl.getRooms = async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
}

// Devolver una habitación por su id
roomCtrl.getRoom = async (req, res) => {
    const room = await Room.findById(req.params.idRoom);
    res.json(room);
}

// Devolver infomarción filtrada respecto a la requests (en desarrollo)
roomCtrl.getRoomByFilter = async (req, res) => {
    // console.log("Room controller metodo getRoomByFilter", req.body);
    const { region, comuna, casa_depto} = req.query;
  
    let query = {};
  
    if (region) {
      query["region"] = region;
    }
    if (comuna) {
      query["comuna"] = comuna;
    }
    if(casa_depto){
      query["casa_depto"] = casa_depto;
    }

    try {
      const rooms = await Room.find(query);
      // console.log("Datos filtrados desde el controller:",rooms);
      res.json(rooms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };

roomCtrl.createRoom = (req, res) =>{
    
}

roomCtrl.editRoom = function () {

}

roomCtrl.deleteRoom = function () {

}


module.exports = roomCtrl;