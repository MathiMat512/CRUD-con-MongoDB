const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    idcategoria: {
        type: String,
        required: [true, 'El ID es obligatorio']
    },
    nombrecategoria: {
        type: String,
        required: [true, 'El nombre de categoria es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
