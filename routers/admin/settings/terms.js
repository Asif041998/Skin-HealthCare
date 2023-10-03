const router = require('express').Router();
const Terms = require('../../../controllers/admin/settings/terms');
const adminVerify = require('../../../middlewares/adminVerify');
const userVerify = require('../../../middlewares/userVerify');

router.post('/settings/terms-and-conditions',adminVerify, Terms.terms);
router.get('/settings/terms-and-conditions',Terms.getAllTerms);
router.put('/settings/terms-and-conditions/:id',adminVerify, Terms.updateTerms);
router.delete('/settings/terms-and-conditions/:id',adminVerify, Terms.deleteTerms);

module.exports = router;