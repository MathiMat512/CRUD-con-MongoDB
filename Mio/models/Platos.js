const mongoose = require('mongoose');

const platoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'El ID del plato es obligatorio']
    },
    nombreplato: {
        type: String,
        required: [true, 'El nombre del plato es obligatorio']
    },
    ingredientes: {
        type: String,
        required: [true, 'Los ingredientes son obligatorios']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
});

const Plato = mongoose.model('Plato', platoSchema);

module.exports = Plato;
