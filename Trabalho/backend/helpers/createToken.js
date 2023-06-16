const jwb = require('jsonwebtoken');

const createToken = async (user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id,
    }, "Este é o secret para criptografia")

    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: user._id
    })

}

module.exports = createToken