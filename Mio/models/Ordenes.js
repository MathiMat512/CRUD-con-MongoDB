const mongoose = require('mongoose');

const ordenSchema = new mongoose.Schema({
    orden: {
        type: String,
        required: [true, 'El numero de orden es obligatorio']
    },
    idmesa: {
        type: String,
        required: [true, 'El NMesa es obligatorio']
    },
    platos_solicitados: {
        type: String,
        required: [true, 'Los platos solicitados son obligatorios']
    },
    cantidades: {
        type: String,
        required: [true, 'la cantidad es obligatoria']
    }
});

const Orden = mongoose.model('Orden', ordenSchema);

module.exports = Orden;
