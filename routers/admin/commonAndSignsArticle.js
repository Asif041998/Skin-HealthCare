const router = require('express').Router();
const CommonAndSignsArticleController = require('../../controllers/admin/commonAndSignsArticle');
const adminVerify = require('../../middlewares/adminVerify');
const UserAdminVerify = require('../../middlewares/userAdminVerify');

// FOR IOS
router.post('/skin-indexes', adminVerify, CommonAndSignsArticleController.createSkinHealthIndex);
router.get('/skin-indexes', UserAdminVerify, CommonAndSignsArticleController.getSkinHealthIndex);
router.get('/skin-indexes/:id', UserAdminVerify, CommonAndSignsArticleController.getSkinHealthIndexById);
router.put('/skin-indexes/:id', adminVerify, CommonAndSignsArticleController.updateSkinHealthIndex);
router.delete('/skin-indexes/:id', adminVerify, CommonAndSignsArticleController.deleteSkinHealthIndex);

module.exports = router;
