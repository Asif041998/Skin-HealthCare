const router = require('express').Router();
const SkincareSuggestion = require('../../controllers/admin/skincareSuggestion');
const adminVerify = require('../../middlewares/adminVerify');

router.post('/skincare-suggestions', adminVerify, SkincareSuggestion.skincareSuggestion);
router.get('/skincare-suggestion', adminVerify, SkincareSuggestion.getSkincareSuggestionByType);
router.get('/skincare-suggestions', adminVerify, SkincareSuggestion.getSkincareSuggestionByType1);
router.get('/skincare-suggestions/:id', adminVerify, SkincareSuggestion.getByIdSkincareSuggestion);
router.put('/skincare-suggestions/:id', adminVerify, SkincareSuggestion.updateSkincareSuggestionByType);
router.delete('/skincare-suggestions/:id', adminVerify, SkincareSuggestion.deleteByIdSkincareSuggestion);

module.exports = router;