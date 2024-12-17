const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    idcliente: {
        type: String,
        required: [true, 'El ID es obligatorio']
    },
    nombrecliente: {
        type: String,
        required: [true, 'El nombre del cliente es obligatorio']
    },
    emailcliente: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    numerocliente: {
        type: String,
        required: [true, 'El numero es obligatorio']
    },
    dnicliente: {
        type: String,
        required: [true, 'El dni es obligatorio']
    },
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;