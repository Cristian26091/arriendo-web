export class Payment {

    constructor(bookingID = '', userID = '', roomID = '', services = [], paymentMethod = '', totalPrice = 0, date = null)
    {
        this.bookingID = bookingID;
        this.userID = userID;
        this.roomID = roomID;
        this.services = services;
        this.paymentMethod = paymentMethod;
        this.totalPrice = totalPrice;
        this.date = date;
    }

    bookingID: String;
    userID: String;
    roomID: String;
    services: String[];
    paymentMethod: String;
    totalPrice: Number;
    date: Date;
}
