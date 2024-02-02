const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.REFRESH_TOKEN, {
            ignoreExpiration: false,
        });
        req.user = verified;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Login expired, please login again." });
        }
        res.status(400).json({ message: "Invalid Token" });
    }
}
