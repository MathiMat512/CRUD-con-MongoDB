const Mesero = require('../models/Meseros')

exports.createMesero = async (req, res) => {
    try {
        const { idmesero, nombremesero, emailmesero, numeromesero } = req.body

        const existingMesero = await Mesero.findOne({ id })
        if (existingMesero) {
            return res.status(400).json({ message: 'el mesero ya existe' })
        }

        const nuevoMesero = new Mesero({ idmesero, nombremesero, emailmesero, numeromesero })
        await nuevoMesero.save()

        res.status(201).json(nuevoMesero)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear mesero', error })
    }
}

exports.getMesero = async (req, res) => {
    try {
        const meseros = await Mesero.find()
        res.status(200).json(meseros)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los meseros', error })
    }
}