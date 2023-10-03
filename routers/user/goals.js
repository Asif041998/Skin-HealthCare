const router = require('express').Router();
const goalController = require('../../controllers/user/goals');
const userVerify = require('../../middlewares/userVerify');

/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: Goals management
 */

/**
 * @swagger
 * /api/v1/goals:
 *   post:
 *     summary: Add Goal 
 *     tags: [Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               providerName:
 *                 type: string
 *                 example: John Doe
 *               reasonForVisit:
 *                 type: string
 *                 example: Skin irritation
 *               diagnoses:
 *                 type: string
 *                 example: John Doe
 *               date:
 *                 type: Date
 *                 example: 03/08/2023
 *     responses:
 *       200:
 *         description: Allergy prescriptions added successfully....
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
router.post('/goals', userVerify, goalController.goals);

/**
 * @swagger
 * /api/v1/goals:
 *   get:
 *     summary: List all goals
 *     tags: [Goals]
 *     parameters:
 *        - in: path
 *          name: goal_type 
 *          required: true
 *          description: Numeric ID required
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All prescriptions....
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
router.get('/goals/:goal_type', userVerify, goalController.getGoalsByType);

/**
 * @swagger
 * /api/v1/goals/{id}:
 *   put:
 *     summary: Add allergy Goals
 *     tags: [Goals]
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
 *               providerName:
 *                 type: string
 *                 example: John Doe
 *               reasonForVisit:
 *                 type: string
 *                 example: Skin irritation
 *               diagnoses:
 *                 type: string
 *                 example: John Doe
 *               date:
 *                 type: Date
 *                 example: 03/08/2023
 *     responses:
 *       200:
 *         description: Allergy prescriptions updated successfully....
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
router.put('/goals/:id', userVerify, goalController.updateByIdGoals);

module.exports = router;
