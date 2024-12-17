const express = require('express');
const router = express.Router();
const Mesero = require('../models/Meseros');

router.get('/', async (req, res) => {
    try {
        const meseros = await Mesero.find();
        res.status(200).json(meseros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los meseros' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { idmesero, nombremesero, emailmesero, numeromesero} = req.body;
        const nuevoMesero = new Mesero({ idmesero, nombremesero, emailmesero, numeromesero });
        await nuevoMesero.save();
        res.status(201).json({ message: 'mesero agregado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar mesero' });
    }
});

module.exports = router;