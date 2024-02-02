const router = require('express').Router();
const adminVerify = require('../../middlewares/adminVerify');
const userVerify = require('../../middlewares/userVerify');
const SubcriptionController = require('../../controllers/user/subscriptions');

router.post('/subscriptions', userVerify, SubcriptionController.createSubcription);
router.put('/subscriptions/:id', userVerify, SubcriptionController.updatesSubcription);
router.get('/subscriptions/:user_id', userVerify, SubcriptionController.getSubcriptionsByUserId);

module.exports = router;