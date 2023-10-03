const router = require('express').Router();
const treatmentController = require('../../controllers/user/treatments');
const userVerify = require('../../middlewares/userVerify')

/**
 * @swagger
 * tags:
 *   name: Treatments
 *   description: Treatments management
 */

  /**
   * @swagger
   * /api/v1/treatments:
   *   post:
   *     summary: Add allergy Prescription
   *     tags: [Treatments]
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
router.post('/treatments', userVerify, treatmentController.treatments);

/**
 * @swagger
 * /api/v1/treatments:
 *   get:
 *     summary: List all Treatments
 *     tags: [Treatments]
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All Treatments....
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
router.get('/treatments', userVerify, treatmentController.getAllTreatments);

  /**
   * @swagger
   * /api/v1/treatments/{id}:
   *   put:
   *     summary: Add allergy Treatment
   *     tags: [Treatments]
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
   *         description: Allergy treatment updated successfully....
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
router.put('/treatments/:id', userVerify, treatmentController.updateByIdTreatments);

/**
 * @swagger
 * /api/v1/treatments/{id}:
 *   get:
 *     summary: get treatments... 
 *     tags: [Treatments]
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
 *         description: Allergy treatments
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
router.get('/treatment/:id',userVerify, treatmentController.getByIdTreatments);
router.get('/treatments/:user_id',userVerify, treatmentController.getByUserIdTreatments);



module.exports = router;
