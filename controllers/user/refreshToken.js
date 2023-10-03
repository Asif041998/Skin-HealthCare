const jwt = require('jsonwebtoken');

exports.generateRefreshToken = async (req, res) => {
    try {
        const { id, email } = req.body;
        const token = jwt.sign({ id: id, email: email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        return res.status(201).json({
            message: "Refresh token generated successfully",
            token: token
        });
    }
    catch (err) {
        return res.status(400).json(err.message);
    }

}