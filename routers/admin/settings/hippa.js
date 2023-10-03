const router = require('express').Router();
const Hippa = require('../../../controllers/admin/settings/hippa');
const adminVerify = require('../../../middlewares/adminVerify');
const userVerify = require('../../../middlewares/userVerify');

router.post('/settings/hippa-notice',adminVerify, Hippa.hippa);
router.get('/settings/hippa-notice', Hippa.getAllHippa);
router.put('/settings/hippa-notice/:id',adminVerify, Hippa.updateHippa);
router.delete('/settings/hippa-notice/:id',adminVerify, Hippa.deleteHippa);

module.exports = router;