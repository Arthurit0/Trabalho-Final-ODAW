const createToken = require('../helpers/createToken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmPassword } = req.body;

        // Validações
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' });
            return
        }

        if (!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório' });
            return
        }

        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório' });
            return
        }

        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória' });
            return
        }

        if (!confirmPassword) {
            res.status(422).json({ message: 'A confirmação de senha é obrigatória' });
            return
        }

        if (password !== confirmPassword) {
            res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!' });
            return
        }

        const checkUser = await User.findOne({ email: email });

        if (checkUser) {
            res.status(422).json({ message: 'Este e-mail já está cadastrado. Por favor utilize outro e-mail!' });
            return
        }

        // Criptografar senha

        const salt = await bcrypt.genSalt();
        const passHash = await bcrypt.genSalt();

        // Criar User
        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passHash,
        })

        try {
            const newUser = await user.save()

            await createToken(newUser, req, res);

        } catch (err) {
            res.status(500).json({ message: err })
        }

    }
}