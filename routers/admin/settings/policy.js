const router = require('express').Router();
const Policy = require('../../../controllers/admin/settings/policy');
const adminVerify = require('../../../middlewares/adminVerify');
const userVerify = require('../../../middlewares/userVerify');

router.post('/settings/privacy-policy', adminVerify, Policy.policy);
router.get('/settings/privacy-policy', Policy.getAllPolicy);
router.put('/settings/privacy-policy/:id', adminVerify, Policy.updatePolicy);
router.delete('/settings/privacy-policy/:id', adminVerify, Policy.deletePolicy);

module.exports = router;