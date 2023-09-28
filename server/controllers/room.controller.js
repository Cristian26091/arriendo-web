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
roomCtrl.uploadModelToBucket = async (req, res) => {
  // console.log(req);
  try {
    if (!req.file) {
        // console.log("golaaa");
        return res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
    }

    const file = req.file; // El archivo que recibes de la solicitud

    // Obtener la fecha actual en formato ISO para crear un nombre de carpeta única
    const currentDate = new Date().toISOString();
    // ruta base en el bucket en la carpeta models
    const baseFolder = 'models'; 
    // Genera un nombre de carpeta única para el modelo utilizando la fecha actual
    const modelFolder = `${baseFolder}/${currentDate}`;
    // Genera un nombre de archivo único para el objeto en el bucket
    const fileName = `${modelFolder}/${Date.now()}-${file.originalname}`;

    const gcsFile = gcBucket.file(fileName);

    // Crear un flujo de escritura para el archivo en GCS
    const writeStream = gcsFile.createWriteStream({
      metadata: {
        contentType: file.mimetype, // Establecer el tipo de contenido del archivo
      },
      resumable: false, // Opcional: desactivar la carga resumible
    });


    // Manejar eventos para el flujo de escritura
    writeStream
      .on('error', (error) => {
        console.error('Error al cargar el archivo en el bucket:', error);
        return res.status(500).json({ message: 'Error al cargar el archivo en el bucket' });
      })
      .on('finish', () => {
        console.log(`Archivo ${fileName} cargado con éxito en el bucket.`);
        return res.status(200).json({ message: 'Archivo cargado con éxito en el bucket.' });
      });

    // Leer el archivo del buffer y escribirlo en GCS
    writeStream.end(file.buffer);

  } catch (error) {
    console.error('Error al cargar el modelo 3D:', error);
    return res.status(500).json({ message: 'Error al cargar el modelo 3D' });
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