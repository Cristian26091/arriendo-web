const Room = require('../models/room');
const roomCtrl = {};

const path = require('path');

const {Storage} = require('@google-cloud/storage');

gc = new Storage({
    keyFilename: path.join(__dirname, '../key_gcs.json'),
    projectId: 'arriendo-web-395104',
});

const bucketName = 'bucket-arriendo-web';
//bucket para carga de archivos.
const gcBucket = gc.bucket(bucketName);

//impresión de buckets
//gc.getBuckets().then(x => console.log(x));

// Función para cargar el modelo 3D en el bucket de GCS
roomCtrl.uploadModelToBucket = async (ModelData) => {
  try {
    
    const file = gcBucket.file(fileName);

    // Subir el archivo al bucket
    await file.save(fileBuffer, {
      metadata: {
        contentType: 'application/octet-stream', // Tipo de contenido para modelos 3D
        resumable: true, // permitir reanudar la carga del archivo
      },
    });

    console.log(`Modelo 3D ${fileName} cargado con éxito.`);
    return fileName; // Devuelve el nombre del archivo cargado
  } catch (error) {
    console.error('Error al cargar el modelo 3D:', error);
    throw error;
  }
};

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