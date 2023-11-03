const Booking = require('../models/booking');
const bookingCtrl = {};


bookingCtrl.getBookings = async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
}

bookingCtrl.getBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);
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

    const booking = new Booking({
        userId: req.body.userId,
        roomId: req.body.roomId,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        fecha_creacion: req.body.fecha_creacion,
        estado: req.body.estado,
        precio: req.body.precio,
        pdf: req.body.pdf,
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
        console.log(existingBooking);
    
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
            precio: req.body.precio
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

bookingCtrl.postContractPDF = async (req, res) => {

}

module.exports = bookingCtrl;
