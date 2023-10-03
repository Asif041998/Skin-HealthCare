const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ message: "Access Denied, Token not provided" });

    try {

        try {
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = decodedToken;
            return next();
        }
        catch (errTokenSecret) {
            const decodedRefreshToken = jwt.verify(token, process.env.REFRESH_TOKEN);
            req.admin = decodedRefreshToken;
            return next();
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
}
