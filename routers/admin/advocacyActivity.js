const router = require('express').Router();
const AdvocacyActivities = require('../../controllers/admin/advocacyActivity');
const adminVerify = require('../../middlewares/adminVerify');
const userVerify = require('../../middlewares/userVerify');
const UserAdminVerify = require('../../middlewares/userAdminVerify');

router.post('/advocacy-activities', adminVerify, AdvocacyActivities.activities);

router.get('/advocacy-activities', UserAdminVerify, AdvocacyActivities.getAllActivities);

router.get('/advocacy-activities/:id', UserAdminVerify, AdvocacyActivities.getByIdActivities);

router.put('/advocacy-activities/:id', adminVerify, AdvocacyActivities.updateByIdActivities);

router.delete('/advocacy-activities/:id', adminVerify, AdvocacyActivities.deleteByIdActivities);

module.exports = router;