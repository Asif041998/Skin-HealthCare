const router = require('express').Router();
const questionnaireController = require('../../controllers/user/questionnaireController');
const userVerify = require('../../middlewares/userVerify');

/**
 * @swagger
 * tags:
 *   name: Survey
 *   description: Questionnaire description
 */

/**
 * @swagger
 * /api/v1/questionnaires:
 *   post:
 *     summary: Answer the Survey
 *     tags: [Survey]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commitment:
 *                 type: string
 *                 example: All in, 100% Committed
 *               challenges:
 *                 type: string
 *                 example: challenge1,challenge2, challenge3
 *               skinTone:
 *                 type: string
 *                 example: Light Brown
 *               skinType:
 *                 type: string
 *                 example: Dry Skin
 *               skinCondition:
 *                 type: string
 *                 example: Dried Skin
 *               skinLocation:
 *                 type: string
 *                 example: Hands
 *               skinDuration:
 *                 type: string
 *                 example: 7 days
 *               skinImage1:
 *                 type: string
 *                 example: closeup.jpeg
 *               skinImage2:
 *                 type: string
 *                 example: standard.jpeg
 *               waterGlasses:
 *                 type: string
 *                 example: 3 glasses or fewer
 *               foodType:
 *                 type: string
 *                 example: packed foods
 *               other:
 *                 type: string
 *                 example: If other, specify here....
 *               freshNonFresh:
 *                 type: string
 *                 example: Mostly non-fresh foods
 *               homeCooked:
 *                 type: string
 *                 example: 1-3 weekly home cooked meals
 *               supplements:
 *                 type: string
 *                 example: I don't take any at this time
 *               sleep:
 *                 type: string
 *                 example: 3-5 hours
 *               troubleAsleep:
 *                 type: string
 *                 example: No
 *               nightSleep:
 *                 type: string
 *                 example: Yes
 *               feelRested:
 *                 type: string
 *                 example: No
 *               exerciseDays:
 *                 type: string
 *                 example: 1-3 days/week
 *               movementType:
 *                 type: string
 *                 example: Squat
 *               stressedDays:
 *                 type: string
 *                 example: 1-3 days/week
 *               impact:
 *                 type: string
 *                 example: physical, emotional, and mental well-being
 *               destress:
 *                 type: string
 *                 example: Meditate
 *               concerns:
 *                 type: string
 *                 example: Be physically active everyday, Eat healthy food
 *     responses:
 *       200:
 *         description: Survey completed....
 *       400:
 *         description: Bad request
 *         content-type: application/json
 *       401:
 *         description: Unauthorized 
 *         content-type: application/json
 *       403:
 *         description: Forbidden
 *         content-type: application/json
 *       404:
 *         description: User not found
 *         content-type: application/json
 *       500:
 *         description: Server Error
 *         content-type: application/json
 */
router.post('/questionnaires', questionnaireController.questionnaires);

/**
 * @swagger
 * /api/v1/questionnaires:
 *   get:
 *     summary: List all Questionnaires
 *     tags: [Survey]
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All Questionnaires....
 *       400:
 *         description: Bad request
 *         content-type: application/json
 *       401:
 *         description: Unauthorized 
 *         content-type: application/json
 *       403:
 *         description: Forbidden
 *         content-type: application/json
 *       404:
 *         description: User not found
 *         content-type: application/json
 *       500:
 *         description: Server Error
 *         content-type: application/json
 */
router.get('/questionnaires', userVerify, questionnaireController.getAllQuestionnaires);

/**
 * @swagger
 * /api/v1/questionnaires/{id}:
 *   put:
 *     summary: Update the questionnaires/survey
 *     tags: [Survey]
 *     parameters:
 *        - in: path
 *          name: id 
 *          required: true
 *          description: Numeric ID required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commitment:
 *                 type: string
 *                 example: All in, 100% Committed
 *               challenges:
 *                 type: string
 *                 example: challenge1,challenge2, challenge3
 *               skinTone:
 *                 type: string
 *                 example: Light Brown
 *               skinType:
 *                 type: string
 *                 example: Dry Skin
 *               skinCondition:
 *                 type: string
 *                 example: Dried Skin
 *               skinLocation:
 *                 type: string
 *                 example: Hands
 *               skinDuration:
 *                 type: string
 *                 example: 7 days
 *               skinImage1:
 *                 type: string
 *                 example: closeup.jpeg
 *               skinImage2:
 *                 type: string
 *                 example: standard.jpeg
 *               waterGlasses:
 *                 type: string
 *                 example: 3 glasses or fewer
 *               foodType:
 *                 type: string
 *                 example: packed foods
 *               other:
 *                 type: string
 *                 example: If other, specify here....
 *               freshNonFresh:
 *                 type: string
 *                 example: Mostly non-fresh foods
 *               homeCooked:
 *                 type: string
 *                 example: 1-3 weekly home cooked meals
 *               supplements:
 *                 type: string
 *                 example: I don't take any at this time
 *               sleep:
 *                 type: string
 *                 example: 3-5 hours
 *               troubleAsleep:
 *                 type: string
 *                 example: No
 *               nightSleep:
 *                 type: string
 *                 example: Yes
 *               feelRested:
 *                 type: string
 *                 example: No
 *               exerciseDays:
 *                 type: string
 *                 example: 1-3 days/week
 *               movementType:
 *                 type: string
 *                 example: Squat
 *               stressedDays:
 *                 type: string
 *                 example: 1-3 days/week
 *               impact:
 *                 type: string
 *                 example: physical, emotional, and mental well-being
 *               destress:
 *                 type: string
 *                 example: Meditate
 *               concerns:
 *                 type: string
 *                 example: Be physically active everyday, Eat healthy food
 *     responses:
 *       200:
 *         description: Survey updated successfully....
 *       400:
 *         description: Bad request
 *         content-type: application/json
 *       401:
 *         description: Unauthorized 
 *         content-type: application/json
 *       403:
 *         description: Forbidden
 *         content-type: application/json
 *       404:
 *         description: User not found
 *         content-type: application/json
 *       500:
 *         description: Server Error
 *         content-type: application/json
 */
router.put('/surveys/:survey_id', userVerify, questionnaireController.updateQuestionnaires);

// /**
//  * @swagger
//  * /api/v1/questionnaires/{id}:
//  *   delete:
//  *     summary: Delete survey
//  *     tags: [Survey]
//  *     parameters:
//  *        - in: path
//  *          name: id 
//  *          required: true
//  *          description: Numeric ID required
//  *     produces:
//  *       - application/json
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Survey deleted....
//  *       400:
//  *         description: Bad request
//  *         content-type: application/json
//  *       401:
//  *         description: Unauthorized 
//  *         content-type: application/json
//  *       403:
//  *         description: Forbidden
//  *         content-type: application/json
//  *       404:
//  *         description: User not found
//  *         content-type: application/json
//  *       500:
//  *         description: Server Error
//  *         content-type: application/json
//  */
// router.delete('/questionnaires/:id', questionnaireController.questionnaires);
router.get('/surveys', userVerify, questionnaireController.getAllSurveysAndDate);
router.get('/surveys/:survey_id', userVerify, questionnaireController.getSurveysById);

module.exports = router;
