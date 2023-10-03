const router = require('express').Router();
const skinCareController = require('../controllers/skinCareController');


/**
 * @swagger
 * tags:
 *   name: SkinCare
 *   description: SkinCare management
 */

  /**
   * @swagger
   * /api/v1/skincare:
   *   post:
   *     summary: Add Skincare details
   *     tags: [SkinCare]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               goal:
   *                 type: string
   *                 example: Skin Brightening
   *               skinConcern:
   *                 type: string
   *                 example:  Acne prone, Anti-ageing
   *               startDate:
   *                 type: string
   *                 example: 04/07/2023
   *               reachedDate:
   *                 type: string
   *                 example: 04/08/2023
   *               prescription:
   *                 type: string
   *                 example: Dr. John Doe
   *               productUser:
   *                 type: string
   *                 example: Honey Halo
   *               facialTreatments:
   *                 type: string
   *                 example: Microdermabrasion
   *     responses:
   *       200:
   *         description: Skincare details added successfully....
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
router.post('/skincare', skinCareController.skinCare);

/**
 * @swagger
 * /api/v1/skincare:
 *   get:
 *     summary: List all Skincare details
 *     tags: [SkinCare]
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All Skincare details....
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
router.get('/skincare', skinCareController.getSkinCare);

/**
 * @swagger
 * /api/v1/skincare/{id}:
 *   put:
 *     summary: Update Skincare details
 *     tags: [SkinCare]
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
 *         description: Skincare details updated....
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
router.put('/skincare/:id', skinCareController.updateSkinCare);

/**
 * @swagger
 * /api/v1/skincare/{id}:
 *   delete:
 *     summary: Delete Skincare details
 *     tags: [SkinCare]
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
 *         description: Skincare details deleted....
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
router.delete('/skincare/:id', skinCareController.deleteSkinCare);

module.exports = router;
