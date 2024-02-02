const router = require('express').Router();
const pushNotification = require('../../controllers/user/push-notification');
const userVerify = require('../../middlewares/userVerify');

router.post('/push-notification', userVerify, pushNotification.sendPushNotification);

module.exports = router;