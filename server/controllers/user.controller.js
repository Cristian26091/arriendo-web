const User = require('../models/user');
const userCtrl = {};
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; // El número de rondas de sal que se utilizará

const mongoose = require('mongoose'); // Importa Mongoose


// Devolver todas los usuarios
userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

// Devolver un usuario por su id
userCtrl.getUser = async (req, res) => {
  console.log("req.params.idUser", req.params.idUser);
    
    if (!mongoose.Types.ObjectId.isValid(req.params.idUser)) {
        return res.status(400).json({ message: 'ID de usuario no válido' });
    }

    const user = await User.findById(req.params.idUser);
    
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    console.log(user);
    res.json(user);
}

userCtrl.createUser= async (req, res) =>{
    try {
        
        const { nombre, apellido, email, telefono, pass, fecha_nacimiento, rut} = req.body; // Obtén los datos del cuerpo de la solicitud
        // console.log("req body_", req.body);
        
        // Verifica si el correo ya existe en la base de datos
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: 'El correo ya está registrado!' });
        }
        
        // Verifica si el rut ya existe en la base de datos
        const existingRut = await User.findOne({ rut });

        if (existingRut) {
            return res.status(400).json({ message: 'El rut ya está registrado!' });
        }
        console.log("hola")

        // encriptar la contraseña
        const hashedPassword = await bcrypt.hash(pass, saltRounds);
        // asignar el rol de usuario
        const userRole = 'user';
        // Generar un token de autenticación
        // const userToken = jwt.sign({ userId: user._id }, 'secreto_registro');
        // Crear un nuevo usuario
        const newUser = new User({ 
          nombre, apellido, email, telefono, pass: hashedPassword, 
          fecha_nacimiento, rut, role: userRole}
        );
        
        await newUser.save();

        // res.status(200).json({ token });

        res.status(201).json({ message: 'Usuario creado con éxito' });
        } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// Función para manejar el inicio de sesión
userCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por nombre de usuario
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Correo no registrado!.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.pass);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    // Generar un token de autenticación
    const token = jwt.sign({ userId: user._id }, 'secreto_acceso', { expiresIn: '1h' });

    res.status(200).json({ token, user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

userCtrl.editUser = function () {

}

userCtrl.deleteUser= function () {

}


module.exports = userCtrl;