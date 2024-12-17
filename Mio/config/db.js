const mongoose = require('mongoose')

const conectarDB = async () => {

    try{

        await mongoose.connect('mongodb://127.0.0.1:27017/sistema', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

    }catch(error){
        console.log(`Error en el servicio: ` + error)
        process.exit(1)
    }
}

module.exports = conectarDB