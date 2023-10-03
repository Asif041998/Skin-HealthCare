const router = require('express').Router();
const RefreshTokenController = require('../../controllers/user/refreshToken');

router.post('/tokens', RefreshTokenController.generateRefreshToken);

module.exports = router;