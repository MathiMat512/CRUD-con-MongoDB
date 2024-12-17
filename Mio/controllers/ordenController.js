const Orden = require('../models/ordenes')

exports.createOrden = async (req, res) => {
    try {
        const { orden, idmesa, platos_solicitados, cantidades } = req.body;

        const existingOrden = await Orden.findOne({ id })
        if (existingOrden) {
            return res.status(400).json({ message: 'La orden ya existe' })
        }

        const nuevaOrden = new Orden({ orden, idmesa, platos_solicitados, cantidades })
        await nuevaOrden.save()

        res.status(201).json(nuevaOrden)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la orden', error })
    }
}

exports.getOrdenes = async (req, res) => {
    try {
        const ordenes = await Orden.find()
        res.status(200).json(ordenes)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ordenes', error })
    }
}