const User = require('../../models/user/user');

exports.emailExists = async (req, res) => {
    try {
        const { email } = req.body;
        const emailExist = await User.findOne({ where: { email: email } });
        if (emailExist)
            return res.status(409).json({ message: "Email already exist", })
        else
            return res.status(200).json({ message: "New user" });
    }
    catch (err) {
        return res.status(400).json(err.message);
    }

}