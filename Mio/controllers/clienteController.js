const Cliente = require('../models/Cliente')

exports.createCliente = async (req, res) => {
    try {
        const { idcliente, nombrecliente, emailcliente, numerocliente, dnicliente } = req.body

        const existingCliente = await Cliente.findOne({ idcliente })
        if (existingCliente) {
            return res.status(400).json({ message: 'el cliente ya existe' })
        }

        const nuevoCliente = new Cliente({ idcliente, nombrecliente, emailcliente, numerocliente, dnicliente })
        await nuevoCliente.save()

        res.status(201).json(nuevoCliente)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear cliente', error })
    }
}

exports.getCliente = async (req, res) => {
    try {
        const clientes = await Cliente.find()
        res.status(200).json(clientes)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes', error })
    }
}