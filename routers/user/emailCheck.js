const router = require('express').Router();
const EmailCheckController = require('../../controllers/user/emailCheck');

router.post('/emails', EmailCheckController.emailExists);

module.exports = router;