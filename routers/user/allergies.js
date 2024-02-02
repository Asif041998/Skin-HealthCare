const router = require('express').Router();
const allergyController = require('../../controllers/user/allergies');
const userVerify = require('../../middlewares/userVerify');

/**
 * @swagger
 * tags:
 *   name: Allergies
 *   description: Allergies management
 */

/**
 * @swagger
 * /api/v1/allergies:
 *   post:
 *     summary: Add allergy information
 *     tags: [Allergies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               allergen:
 *                 type: string
 *                 example: Egg
 *               allergic_reaction:
 *                 type: string
 *                 example: Skin reactions, such as swelling, a rash, hives or eczema
 *               healing_methods:
 *                 type: string
 *                 example: Antihistamines to ease symptoms, Emergency epinephrine shots
 *     responses:
 *       201:
 *         description: Allergies added successfully....
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
router.post('/allergies', userVerify, allergyController.allergy);

/**
 * @swagger
 * /api/v1/allergies:
 *   get:
 *     summary: List all allergies
 *     tags: [Allergies]
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All allergies....
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
router.get('/allergies', userVerify, allergyController.getAllAllergies);

/**
   * @swagger
   * /api/v1/allergies/{id}:
   *   put:
   *     summary: Update allergy information
   *     tags: [Allergies]
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
   *               allergen:
   *                 type: string
   *                 example: Egg
   *               allergic_reaction:
   *                 type: string
   *                 example: Skin reactions, such as swelling, a rash, hives or eczema
   *               healing_methods:
   *                 type: string
   *                 example: Antihistamines to ease symptoms, Emergency epinephrine shots
   *     responses:
   *       201:
   *         description: Allergies updated successfully....
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
router.put('/allergies/:id', userVerify, allergyController.updateByIdAllergies);

/**
 * @swagger
 * /api/v1/allergies/{id}:
 *   delete:
 *     summary: Get allergy by id
 *     tags: [Allergies]
 *     parameters:
 *        - in: path
 *          name: id 
 *          required: true
 *          description: Numeric ID required
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Allergy fetched successfully....
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
router.get('/allergy/:id', userVerify, allergyController.getByIdAllergy);
router.get('/allergies/:user_id', userVerify, allergyController.getByUserIdAllergy);

module.exports = router;
