const Booking = require('../models/booking');
const bookingCtrl = {};

const path = require('path');

const {Storage} = require('@google-cloud/storage');

const uuid = require('uuid'); // Importar el paquete uuid
const { url } = require('inspector');

gc = new Storage({
    keyFilename: path.join(__dirname, '../key_gcs.json'),
    projectId: 'arriendo-web-395104',
});

const bucketName = 'bucket-arriendo-web';
//bucket para carga de archivos.
const gcBucket = gc.bucket(bucketName);



//-------------------- METODOS ---------------------------------

bookingCtrl.getBookings = async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
}

bookingCtrl.getBooking = async (req, res) => {
    console.log(req.params);
    const booking = await Booking.findById(req.params.idBooking);
    res.json(booking);
}

bookingCtrl.getBookingByUser = async (req, res) => {
    // console.log(req.params)
    const booking = await Booking.find({userId: req.params.idUser});
    // console.log(booking);
    res.json(booking);
}

bookingCtrl.getBookingByRoom = async (req, res) => {
    const booking = await Booking.find({roomId: req.params.idRoom});
    res.json(booking);
}

bookingCtrl.createBooking = async (req, res) => {

    // console.log(req.body);

    const booking = new Booking({
        userId: req.body.userId,
        roomId: req.body.roomId,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        fecha_creacion: req.body.fecha_creacion,
        estado: req.body.estado,
        precio: req.body.precio,
        pdf: req.body.pdf,
        url_pdf_user: 'null',
        ref_pdf_user: 'null',

    });
    await booking.save();
    res.json({
        'status': 'Booking saved'
    });
}

bookingCtrl.putBooking = async (req, res) => {
    
    try {
        if(!req.body){
            return res.status(400).send({
                message: "La reserva no puede estar vacia"
            });
        }
    
        const { _id } = req.body; // id de la reserva
        const existingBooking = await Booking.findById(_id);
        // console.log(existingBooking);
    
        if(!existingBooking){
            return res.status(400).json({ message: 'La reserva no está registrada!' });
        }

        const booking = {
            userId: req.body.userId,
            roomId: req.body.roomId,
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            fecha_creacion: req.body.fecha_creacion,
            estado: req.body.estado,
            precio: req.body.precio,
            url_pdf_user: req.body.url_pdf_user,
            ref_pdf_user: req.body.ref_pdf_user,
        }
    
        await Booking.findByIdAndUpdate(_id, {$set: booking}, {new: true} )
        res.json({ message: 'Reserva actualizada con exito!' });

    } catch (error) {
        return res.status(400).json({ message: 'Ocurrio un error al actualizar la reserva!' });
    }

}

bookingCtrl.deleteBooking = async (req, res) => {
    await Booking.findByIdAndRemove(req.params.idBooking);
    res.json({
        'status': 'Booking deleted'
    });
}

bookingCtrl.uploadPdfToBucket = async (req, res) => {
    
    try {
        
        if(!req.file){
            res.status(400).send({
                status: false,
                data: 'No file is selected.'
            });
        }

        const file = req.file;
        const uniqueId = uuid.v4();
        const baseFolder = 'contracts'; // ruta base en el bucket en la carpeta models
        const fileName = `${baseFolder}/${uniqueId}`;// Genera un nombre de archivo único para el objeto en el bucket
        const gcsFile = gcBucket.file(fileName); // Crea un objeto de archivo en el bucket

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
            // console.log(`Archivo ${fileName} cargado con éxito en el bucket.`);
            return res.status(200).json({ 
                message: 'Archivo cargado con éxito en el bucket.',
                downloadLink,
                fileName,
            });
            });
    
        // Leer el archivo del buffer y escribirlo en GCS
        writeStream.end(file.buffer);



    } catch (error) {
        res.status(500).send({
            status: false,
            data: error
        });
    }

    


}

module.exports = bookingCtrl;
