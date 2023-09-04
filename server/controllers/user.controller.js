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

userCtrl.createUser= async (req, res) =>{
    try {
        
        const { nombre, apellido, email, telefono, pass, fecha_nacimiento, rut} = req.body; // Obtén los datos del cuerpo de la solicitud
        console.log("req body_", req.body);
        
        // Verifica si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ email, rut });

        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado!' });
        }

        // Crea un nuevo usuario en la base de datos
        const newUser = new User({ nombre, apellido, email, telefono, pass, fecha_nacimiento, rut });
        await newUser.save();

        res.status(201).json({ message: 'Usuario creado con éxito' });
        } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// Método para verificar si el correo ya está registrado
userCtrl.checkEmailExistence = async (req, res) => {
    const email = req.query.email;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        // El correo ya está registrado
        res.json(true);
      } else {
        // El correo no está registrado
        res.json(false);
      }
    } catch (error) {
      console.error('Error al verificar el correo:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  
  // Método para verificar si el RUT ya está registrado
  userCtrl.checkRutExistence = async (req, res) => {
    const rut = req.query.rut;
  
    try {
      const existingUser = await User.findOne({ rut });
  
      if (existingUser) {
        // El RUT ya está registrado
        res.json(true);
      } else {
        // El RUT no está registrado
        res.json(false);
      }
    } catch (error) {
      console.error('Error al verificar el RUT:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };



userCtrl.editUser = function () {

}

userCtrl.deleteUser= function () {

}


module.exports = userCtrl;