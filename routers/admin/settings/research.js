const router = require('express').Router();
const Research = require('../../../controllers/admin/settings/research');
const adminVerify = require('../../../middlewares/adminVerify');
const userVerify = require('../../../middlewares/userVerify');

router.post('/settings/research-notice', adminVerify, Research.research);
router.get('/settings/research-notice', Research.getAllResearch);
router.put('/settings/research-notice/:id', adminVerify, Research.updateResearch);
router.delete('/settings/research-notice/:id', adminVerify, Research.deleteResearch);

module.exports = router;