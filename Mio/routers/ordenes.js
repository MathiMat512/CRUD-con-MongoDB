const express = require('express');
const router = express.Router();
const Orden = require('../models/Ordenes');

router.get('/', async (req, res) => {
    try {
        const ordenes = await Orden.find();
        res.status(200).json(ordenes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las ordenes' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { orden, idmesa, platos_solicitados, cantidades} = req.body;
        const nuevoOrden = new Orden({ orden, idmesa, platos_solicitados, cantidades });
        await nuevoOrden.save();
        res.status(201).json({ message: 'Orden agregado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar orden' });
    }
});

router.delete('/:orden', async (req, res) => {
    try {
        const { orden } = req.params;
        await Orden.findByIdAndDelete(orden);
        res.status(200).json({ message: 'Orden eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el orden', error });
    }
});

module.exports = router;
