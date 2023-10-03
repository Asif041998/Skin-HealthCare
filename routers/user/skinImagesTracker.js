const router = require('express').Router();
const SkinImagesController = require('../../controllers/user/skinImagesTracker');
const userVerify = require('../../middlewares/userVerify');

router.post('/skin-tracker', userVerify, SkinImagesController.skinImagesTracker);
router.get('/skin-tracker', userVerify, SkinImagesController.getAllSkinImages);
router.get('/skin-tracker/:id', userVerify, SkinImagesController.getAllSkinImagesById);
router.get('/skin-tracker/:user_id/:goal_type', userVerify, SkinImagesController.getAllSkinImagesByUserIdAndGoalType);
router.get('/skin-tracker/:user_id', userVerify, SkinImagesController.getAllSkinImagesByUserId);
router.put('/skin-tracker/:id', userVerify, SkinImagesController.updateSkinImagesTracker);

module.exports = router;