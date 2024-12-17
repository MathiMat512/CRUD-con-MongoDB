const Plato = require('../models/Platos')

exports.createPlato = async (req, res) => {
    try {
        const { id, nombreplato, ingredientes, precio } = req.body

        const existingPlato = await Plato.findOne({ id })
        if (existingPlato) {
            return res.status(400).json({ message: 'el plato ya existe' })
        }

        const nuevoPlato = new Plato({ id, nombreplato, ingredientes, precio })
        await nuevoPlato.save()

        res.status(201).json(nuevoPlato)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear plato', error })
    }
}
exports.getPlato = async (req, res) => {
    try {
        const platos = await Plato.find()
        res.status(200).json(platos)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los platos', error })
    }
}