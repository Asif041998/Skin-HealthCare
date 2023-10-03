const router = require('express').Router();
const adminVerify = require('../../middlewares/adminVerify');
const CollaboratorController = require('../../controllers/admin/collaborators');

router.post('/collaborators',adminVerify, CollaboratorController.createCollaborators);
router.get('/collaborators', adminVerify, CollaboratorController.getAllTheCollaborators);
router.get('/collaborators/:id', adminVerify, CollaboratorController.getCollaboratorsById);
router.put('/collaborators/:id', adminVerify, CollaboratorController.updateCollaborators);
router.delete('/collaborators/:id', adminVerify, CollaboratorController.deleteCollaborators);

module.exports = router;