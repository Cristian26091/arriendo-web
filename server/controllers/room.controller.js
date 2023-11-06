const Room = require('../models/room');
const roomCtrl = {};

const path = require('path');

const {Storage} = require('@google-cloud/storage');

const uuid = require('uuid'); // Importar el paquete uuid

gc = new Storage({
    keyFilename: path.join(__dirname, '../key_gcs.json'),
    projectId: 'arriendo-web-395104',
});

const bucketName = 'bucket-arriendo-web';
//bucket para carga de archivos.
const gcBucket = gc.bucket(bucketName);

//-------------------- METODOS --------------------

// Función para cargar el modelo 3D en el bucket de GCS
roomCtrl.uploadModelToBucket = async (req, res) => {
  try {
    if (!req.file) {
        return res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
    }

    const file = req.file; // El archivo que recibes de la solicitud
    const uniqueId = uuid.v4();
    const baseFolder = 'models'; // ruta base en el bucket en la carpeta models
    const modelFolder = `${baseFolder}/${uniqueId}`;// Genera un nombre de carpeta única para el modelo utilizando la fecha actual
    const fileName = `${modelFolder}/${file.originalname}`;// Genera un nombre de archivo único para el objeto en el bucket
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
      .on('finish', async () => {
        // Dar permisos públicos al archivo
        await gcsFile.makePublic();

        // Devuelve el enlace descargable y el nombre de archivo
        const downloadLink = `https://storage.googleapis.com/bucket-arriendo-web/${fileName}`;
        console.log(`Archivo ${fileName} cargado con éxito en el bucket.`);
        return res.status(200).json({ 
          message: 'Archivo cargado con éxito en el bucket.',
          downloadLink,
          fileName,
        });
      });

    // Leer el archivo del buffer y escribirlo en GCS
    writeStream.end(file.buffer);

  } catch (error) {
    console.error('Error al cargar el modelo 3D:', error);
    return res.status(500).json({ message: 'Error al cargar el modelo 3D' });
  }
}

//función para eliminar el modelo 3D del bucket de GCS
roomCtrl.deleteModelFromBucket = async (req, res) => {
  console.log(req.params);
  try {
    const { folder } = req.params;

    if (!folder) {
      return res.status(400).json({ message: 'No se proporcionó ningún nombre de archivo.' });
    }
    const bucket = gcBucket; // Obtén el bucket de GCS
    const baseFolder = 'models'
    const folderPath = `${baseFolder}/${folder}/`; // Genera la ruta de la carpeta en el bucket
    console.log(folderPath);
    // Obtén una lista de objetos en la carpeta
    const [files] = await bucket.getFiles({ prefix: folderPath });

    // Elimina cada objeto en la carpeta, la carpeta se elimina sola cuando no quede nada en ella.
    await Promise.all(files.map(file => file.delete()));

    console.log(`Todos los objetos en la carpeta ${folder} eliminados con éxito.`);
    return res.status(200).json({ message: 'Carpeta y objetos eliminados con éxito.' });
  } catch (error) {
    console.error('Error al eliminar la carpeta y objetos:', error);
    return res.status(500).json({ message: 'Error al eliminar la carpeta y objetos.' });
  }

}

// Función para cargar la imagen en el bucket de GCS
roomCtrl.uploadImageToBucket = async (req, res) => {

  const files = req.files;
  // console.log(files);

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
  }

  const uniqueId = uuid.v4(); // Genera un ID único para la carpeta
  const baseFolder = 'room-image-cover'; // Ruta base en el bucket en la carpeta models
  const uploadedImages = [];

  for (const file of files) {
    try {
      const blob = gcBucket.file(`${baseFolder}/${uniqueId}/${file.originalname}`);;

      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on('error', (err) => {
        console.error(err);
        // Manejar el error de la carga aquí, tal vez devolver una respuesta de error al cliente
      });

      blobStream.on('finish', async () => {
        try {
          // La imagen se cargó exitosamente
          console.log(`Imagen ${file.originalname} cargada en GCS.`);
          // Dar permisos públicos al archivo
          await blob.makePublic();
          // Obtener el enlace descargable (URL) del archivo
          const downloadLink = `https://storage.googleapis.com/${blob.bucket.name}/${blob.name}`;
          // Agregar la información de la imagen al array de imágenes cargadas
          uploadedImages.push({ downloadLink, fileName: blob.name });
        
          if (uploadedImages.length  === files.length) {
            // Si todas las imágenes se han cargado, devuelve la respuesta
            res.json({ message: 'Imágenes cargadas con éxito', images: uploadedImages });
          }
        } catch (error) {
          console.error('Error al dar permisos públicos al archivo:', error);
          res.status(500).json({ message: 'Error al cargar la imagen' });
        }
      
      });

      // Iniciar la carga del archivo
      blobStream.end(file.buffer);

    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      return res.status(500).json({ message: 'Error al cargar la imagen' });
    }
  }

}

roomCtrl.deleteImagesFromBucket = async (req, res) => {
  const {folder, file} = req.params;

  if(!folder || !file){
    return res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
  }

  try {
    const baseFolder = 'room-image-cover'; // Ruta base en el bucket en la carpeta models
    const bucket = gcBucket; // Obtén el bucket de GCS
    const filePath = `${baseFolder}/${folder}/${file}`; // Genera la ruta del archivo en el bucket
    // Elimina el archivo del bucket
    await bucket.file(filePath).delete();
    console.log(`Archivo ${file} eliminado con éxito.`);
    return res.status(200).json({ message: 'Archivo eliminado con éxito.' });
  } catch (error) {
    console.error('Error al eliminar imágenes:', error);
    return res.status(500).json({ message: 'Error al eliminar la carpeta y objetos.' });
  }
}

// Función para cargar la textura en el bucket de GCS
roomCtrl.uploadTextureToBucket = async (req, res) => {
  console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
    }

    const file = req.file; // El archivo que recibes de la solicitud
    const uniqueId = uuid.v4();
    const baseFolder = 'textures';
    const fileName = `${baseFolder}/${uniqueId}_${file.originalname}`;
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
      .on('finish', async () => {
        // Dar permisos públicos al archivo
        console.log("entro al finish!");
        await gcsFile.makePublic();

        // Devuelve el enlace descargable y el nombre de archivo
        const downloadLink = `https://storage.googleapis.com/bucket-arriendo-web/${fileName}`;
        console.log(`Archivo ${fileName} cargado con éxito en el bucket.`);
        return res.status(200).json({ 
          message: 'Archivo cargado con éxito en el bucket.',
          downloadLink,
          fileName,
        });
      });
    // Leer el archivo del buffer y escribirlo en GCS
    writeStream.end(file.buffer);
  } catch (error) {
    console.error('Error al cargar la textura:', error);
    return res.status(500).json({ message: 'Error al cargar la textura' });
  }
}

roomCtrl.deleteTextureFromBucket = async (req, res) => {
  try {
    const { file } = req.params;

    if (!file) {
      return res.status(400).json({ message: 'No se proporcionó ningún nombre de archivo.' });
    }
    const bucket = gcBucket; // Obtén el bucket de GCS
    const baseFolder = 'textures'
    const filePath = `${baseFolder}/${file}`; // Genera la ruta del archivo en el bucket
   
    const gcsFile = bucket.file(filePath);

    // Verificar si el archivo existe
    const [exists] = await gcsFile.exists();

    if (!exists) {
      return res.status(404).json({ message: 'El archivo no existe.' });
    }

    // Eliminar el archivo específico
    await gcsFile.delete();
    console.log(`Archivo ${file} eliminado con éxito.`);
    return res.status(200).json({ message: 'Archivo eliminado con éxito.' });
  } catch (error) {
    console.error('Error al eliminar la carpeta y objetos:', error);
    return res.status(500).json({ message: 'Error al eliminar la carpeta y objetos.' });
  }
}

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

roomCtrl.filterRoomsByResults = async (req, res) => {
  const { minPrice, maxPrice, typeHouse, isSharedBathroom} = req.query;
  console.log(req.query);

  let query = {};

  // Agregar criterios de filtro según los parámetros de consulta
  if (minPrice) {
    query.precio = { $gte: minPrice };
  }
  if (maxPrice) {
    query.precio = { ...query.precio, $lte: maxPrice };
  }
  if (typeHouse) {
    query.casa_depto = typeHouse;
  }
  if (isSharedBathroom) {
    query.banio_compartido = true;
  }

  try {
    const rooms = await Room.find(query);

    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }

}

roomCtrl.createRoom = async (req, res) =>{
  // console.log(req.body);
  const roomDataFromClient = req.body;
  console.log("roomDataFromClient:", roomDataFromClient);
  const room = new Room({
    _id: roomDataFromClient.id, // Asegúrate de que los nombres coincidan
    id_region: roomDataFromClient.id_region,
    casa_id: roomDataFromClient.id_casa,
    latitude: roomDataFromClient.latitude,
    longitud: roomDataFromClient.longitud,
    banio_compartido: roomDataFromClient.banio_compartido,
    descripcion: roomDataFromClient.descripcion,
    fecha_publicacion: roomDataFromClient.fecha_publicacion,
    region: roomDataFromClient.region,
    ciudad: roomDataFromClient.ciudad,
    comuna: roomDataFromClient.comuna,
    calle: roomDataFromClient.calle,
    numero: roomDataFromClient.numero,
    casa_depto: roomDataFromClient.casa_depto,
    precio: roomDataFromClient.precio,
    esta_arrendado: roomDataFromClient.esta_arrendado,
    url_img_cover: roomDataFromClient.url_img_cover,
    url_model: roomDataFromClient.url_model,
    url_texture: roomDataFromClient.url_texture,
    model_ref_bucket: roomDataFromClient.model_ref_bucket,
    image_ref_bucket: roomDataFromClient.image_ref_bucket,
    texture_ref_bucket: roomDataFromClient.texture_ref_bucket,
    reservas: roomDataFromClient.reservas,
    bucket_ref_imgs: roomDataFromClient.bucket_ref_imgs,
    url_model_LQ: roomDataFromClient.url_model_LQ,
    model_LQ_ref_bucket: roomDataFromClient.model_ref_bucket_LQ,
    url_texture_LQ: roomDataFromClient.url_texture_LQ ,
    texture_LQ_ref_bucket: roomDataFromClient.texture_ref_bucket_LQ,
  });
  console.log(room);
  await room.save();
  res.json({
    'status': 'Room saved'
  });
  
}

roomCtrl.editRoom = function () {

}

roomCtrl.deleteRoom = async (req, res) => {
  await Room.findByIdAndRemove(req.params.idRoom);
  res.json({
    'status': 'Room removed'
  });
}


module.exports = roomCtrl;