const User = require('../models/user');
const userCtrl = {};

// Devolver todas las habitaciones
userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

// Devolver una habitación por su id
userCtrl.getUser = async (req, res) => {
    const user = await Room.findById(req.params.idUser);
    res.json(user);
}

userCtrl.createUser= (req, res) =>{
    
}

userCtrl.editUser = function () {

}

userCtrl.deleteUser= function () {

}


module.exports = userCtrl;