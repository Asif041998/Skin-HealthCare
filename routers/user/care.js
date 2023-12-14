const router = require('express').Router();
const Cares = require('../../controllers/user/care');
const userVerify = require('../../middlewares/userVerify');

router.post('/cares', userVerify, Cares.care);
router.get('/cares/:user_id', userVerify, Cares.getCareUserById);

module.exports = router;