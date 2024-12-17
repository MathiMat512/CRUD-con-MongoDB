const Categoria = require('../models/Categoria')  // Importa el modelo de Clientes

// Crear un nuevo cliente
exports.createCategoria = async (req, res) => {
    try {
        const { idcategoria, nombrecategoria, descripcion } = req.body

        // Verificar si el cliente ya existe
        const existingCategoria = await Categoria.findOne({ id })
        if (existingCategoria) {
            return res.status(400).json({ message: 'la categoria ya existe' })
        }

        // Crear el nuevo cliente
        const nuevaCategoria = new Categoria({ idcategoria, nombrecategoria, descripcion })
        await nuevaCategoria.save()

        res.status(201).json(nuevaCategoria)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la categoria', error })
    }
}

// Obtener todas las categorias
exports.getCategoria = async (req, res) => {
    try {
        const categorias = await Categoria.find()
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorias', error })
    }
} 