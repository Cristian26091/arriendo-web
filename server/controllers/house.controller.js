const House = require ('../models/house');

const houseCtrl = {};

houseCtrl.getHouses = async (req, res) => {
    const houses = await House.find();
    res.json(houses);
}

houseCtrl.getHouse = async (req, res) => {
    const house = await House.findById(req.params.id);
    res.json(house);
}

houseCtrl.createHouse = async (req, res) => {
    // console.log(req.body);
    if (!req.body) {
        return res.status(400).send({
            message: "House content can not be empty"
        });
    }

    const house = new House({
        fecha_publicacion: req.body.fecha_publicacion,
        fecha_termino: req.body.fecha_termino,
        precio: req.body.precio,
        duenio: req.body.duenio
    });

    house.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocurrio un error al crear la casa."
            });
        });

}

houseCtrl.editHouse = async (req, res) => {
    const { id } = req.params;
    const house = {
        fecha_publicacion: req.body.fecha_publicacion,
        fecha_termino: req.body.fecha_termino,
        precio: req.body.precio,
        duenio: req.body.duenio
    };
    await House.findByIdAndUpdate(id, {$set: house}, {new: true});
    res.json({status: 'House Updated'});
}

houseCtrl.deleteHouse = async (req, res) => {

    try {
        if (!req.body) {
            return res.status(400).send({
                message: "La casa no puede ser vacia!"
            });
        }
    
        const { idHouse } = req.params;
        // Verifica si la casa existe en la base de datos
        const existingHouse = await House.findById(idHouse);
    
        if (!existingHouse) {
            return res.status(400).json({ message: 'La casa no existe!' });
        }
    
        await House.findByIdAndDelete(idHouse);
        res.status(200).json({ message: 'Casa eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar casa:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

    
  
}


module.exports = houseCtrl