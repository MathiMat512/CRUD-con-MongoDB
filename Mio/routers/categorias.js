const express = require('express');
const router = express.Router();
const Orden = require('../models/Categoria');

// Ruta para obtener todas las categorias
router.get('/', async (req, res) => {
    try {
        const categorias = await Orden.find();
        res.status(200).json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las categorias' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { idcategoria, nombrecategoria, descripcion} = req.body;
        const nuevaCategoria = new Orden({ idcategoria, nombrecategoria, descripcion });
        await nuevaCategoria.save();
        res.status(201).json({ message: 'categoria agregada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar categoria' });
    }
});

module.exports = router;
