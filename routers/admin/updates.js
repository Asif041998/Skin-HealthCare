const router = require('express').Router();
const adminVerify = require('../../middlewares/adminVerify');
const userAdminVerify = require('../../middlewares/userAdminVerify');
const UpdatesController = require('../../controllers/admin/updates');

router.post('/updates', adminVerify, UpdatesController.createUpdates);
router.get('/updates/:os_type', userAdminVerify, UpdatesController.getAllUpdatesByPlatfrom);
router.get('/updates/:id', userAdminVerify, UpdatesController.getUpdatesById);
router.get('/updates', adminVerify, UpdatesController.getAllTheUpdates);
router.delete('/updates/:id', adminVerify, UpdatesController.deleteUpdates);

module.exports = router;