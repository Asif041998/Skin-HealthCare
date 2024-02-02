const router = require('express').Router();
const SkinImagesController = require('../../controllers/user/skinImages');
const userVerify = require('../../middlewares/userVerify');

router.post('/skin-images', userVerify, SkinImagesController.skinImages);
router.get('/skin-images', userVerify, SkinImagesController.getAllSkinImages);
router.get('/skin-image/:id', userVerify, SkinImagesController.getAllSkinImagesById);
router.get('/skin-images/:user_goal_id', userVerify, SkinImagesController.getAllSkinImagesByUserGoalId);
router.put('/skin-images/:id', userVerify, SkinImagesController.updateSkinImages);

module.exports = router;