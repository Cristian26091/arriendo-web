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

bookingCtrl.createBooking = async (req, res) => {
    const booking = new Booking({
        userId: req.body.userId,
        roomId: req.body.roomId,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        fecha_creacion: req.body.fecha_creacion,
        estado: req.body.estado
    });
    await booking.save();
    res.json({
        'status': 'Booking saved'
    });
}

bookingCtrl.editBooking = async (req, res) => {

}

bookingCtrl.deleteBooking = async (req, res) => {
    await Booking.findByIdAndRemove(req.params.id);
    res.json({
        'status': 'Booking deleted'
    });
}

module.exports = bookingCtrl;
