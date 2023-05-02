const Room = require('../models/room');
const roomCtrl = {};

roomCtrl.getRooms = async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
}

roomCtrl.getRoom = async (req, res) => {
    // console.log("entre al controller de getrooms");
    const room = await Room.findById(req.params.idRoom);
    res.json(room);
}

// Devolver infomarción filtrada respecto a la requests (en desarrollo)
roomCtrl.getRoomByFilter = async (req, res) => {
    console.log("Room controller metodo getRoomByFilter", req.body);
    const { region, comuna} = req.query;
  
    let query = {};
  
    if (region) {
      query["region"] = region;
    }
    if (comuna) {
      query["comuna"] = comuna;
    }
    // if (casa_depto) {
    //   query.casa_depto = casa_depto;
    // }
    // console.log(req);
    try {
      console.log("=======================================");
      console.log(query);
      console.log("=======================================");
      // console.log(query);
      const rooms = await Room.find(query);
      console.log("Datos filtrados desde el controller:",rooms);
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