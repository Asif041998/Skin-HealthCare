const router = require('express').Router();
const SkincareRoutine101 = require('../../controllers/admin/skincareRoutine101');
const adminVerify = require('../../middlewares/adminVerify');
const userAdminVerify = require('../../middlewares/userAdminVerify')

router.post('/skincare-routines', adminVerify, SkincareRoutine101.skincareRoutine101);
router.put('/skincare-routines/:id', adminVerify, SkincareRoutine101.updateSkincareRoutine101);
router.delete('/skincare-routines/:id', adminVerify, SkincareRoutine101.deleteSkincareRoutine101);
router.get('/skincare-routines/:id', adminVerify, SkincareRoutine101.getByIdSkincareRoutine101);
router.get('/skincare-routines', adminVerify, SkincareRoutine101.getAllSkincareRoutine101);

module.exports = router;