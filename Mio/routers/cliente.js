const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los clientes' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { idcliente, nombrecliente, emailcliente, numerocliente, dnicliente} = req.body;
        const nuevoCliente = new Cliente({ idcliente, nombrecliente, emailcliente, numerocliente, dnicliente });
        await nuevoCliente.save();
        res.status(201).json({ message: 'cliente agregado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar cliente' });
    }
});

module.exports = router;