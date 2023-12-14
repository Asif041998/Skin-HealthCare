const router = require('express').Router();
const SkinAnalysis = require('../../controllers/user/skinAnalysis');
const userVerify = require('../../middlewares/userVerify');

router.post('/skin-health-analysis', userVerify, SkinAnalysis.skinAnalysis);
router.get('/skin-health-analysis/:user_id', userVerify, SkinAnalysis.getAllSkinAnalysisByUserId);
router.get('/skin-analysis/:user_id', userVerify, SkinAnalysis.getAllSkinAnalysisByDate);

module.exports = router;