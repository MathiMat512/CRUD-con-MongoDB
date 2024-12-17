const mongoose = require('mongoose');

const meseroSchema = new mongoose.Schema({
    idmesero: {
        type: String,
        required: [true, 'El ID es obligatorio']
    },
    nombremesero: {
        type: String,
        required: [true, 'El nombre de mesero es obligatorio']
    },
    emailmesero: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    numeromesero: {
        type: String,
        required: [true, 'El numero es obligatorio']
    },
});

const Mesero = mongoose.model('Mesero', meseroSchema);

module.exports = Mesero;