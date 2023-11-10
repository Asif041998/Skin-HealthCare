const router = require('express').Router();
const adminVerify = require('../../middlewares/adminVerify');
const UserAdminVerify = require('../../middlewares/userAdminVerify');
const CollaboratorController = require('../../controllers/admin/collaborators');

router.post('/collaborators',adminVerify, CollaboratorController.createCollaborators);
router.get('/collaborators', UserAdminVerify, CollaboratorController.getAllTheCollaborators);
router.get('/collaborators/:id', UserAdminVerify, CollaboratorController.getCollaboratorsById);
router.put('/collaborators/:id', adminVerify, CollaboratorController.updateCollaborators);
router.delete('/collaborators/:id', CollaboratorController.deleteCollaborators);

module.exports = router;