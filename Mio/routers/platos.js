const express = require('express');
const router = express.Router();
const Plato = require('../models/Platos');

router.get('/', async (req, res) => {
    try {
        const platos = await Plato.find();
        res.status(200).json(platos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los platillos' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { id, nombreplato, ingredientes, precio} = req.body;
        const nuevoPlato = new Plato({ id, nombreplato, ingredientes, precio });
        await nuevoPlato.save();
        res.status(201).json({ message: 'platillos agregado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar platillos' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Plato.findByIdAndDelete(id);
        res.status(200).json({ message: 'Platillo eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el platillo', error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreplato, ingredientes, precio } = req.body;

        const platoActualizado = await Plato.findByIdAndUpdate(id, {
            nombreplato,
            ingredientes,
            precio
        }, { new: true });

        if (!platoActualizado) {
            return res.status(404).json({ message: 'Platillo no encontrado' });
        }

        res.status(200).json({ message: 'Platillo actualizado correctamente', platoActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el platillo', error });
    }
});

module.exports = router;