const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config/global')

exports.crearUsuario = async (req, res) => {

    try{

        const { email, password } = req.body
        const user = await User.findOne({ email: email })

        if(!user){
            return res.status(404).send('El usuario no existe')
        }

        const validPassword = await user.validatePassword(password)

        if(!validPassword){
            return res.status(401).json({ auth: false, token: null })
        }

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        })

        res.json({auth: true, token})

    }catch(error){
        console.log(error)
        res.status(500).send('Hubo un error')
    }

}

exports.obtenerUsuario = async (req, res) => {

    try{

        const { email, password } = req.body
        const user = await User.findOne({ email: email })

        if(!user){
            return res.status(404).send('El usuario no existe')
        }

        const validPassword = await user.validatePassword(password)

        if(!validPassword){
            return res.status(401).json({ auth: false, token: null })
        }

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        })

        res.json({auth: true, token})

    }catch(error){
        console.log(error)
        res.status(500).send('Hubo un error')
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send('El usuario no existe');
        }

        const validPassword = await user.validatePassword(password);
        if (!validPassword) {
            return res.status(401).json({ auth: false, token: null });
        }

        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 60 * 60 * 24
        });

        res.json({ auth: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }
};
