const router = require('express').Router();
const prescriptionController = require('../../controllers/user/prescriptions');
const userVerify = require('../../middlewares/userVerify');

/**
 * @swagger
 * tags:
 *   name: Prescription
 *   description: Prescription management
 */

/**
 * @swagger
 * /api/v1/prescriptions:
 *   post:
 *     summary: Add allergy Prescription
 *     tags: [Prescription]
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
router.post('/prescriptions', userVerify, prescriptionController.prescriptions);

/**
 * @swagger
 * /api/v1/prescriptions:
 *   get:
 *     summary: List all Prescription
 *     tags: [Prescription]
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
router.get('/prescriptions', userVerify, prescriptionController.getAllPrescriptions);

/**
 * @swagger
 * /api/v1/prescriptions/{id}:
 *   put:
 *     summary: Add allergy Prescription
 *     tags: [Prescription]
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
router.put('/prescriptions/:id', userVerify, prescriptionController.updateByIdPrescriptions);

/**
 * @swagger
 * /api/v1/prescriptions/{id}:
 *   get:
 *     summary: get prescription... 
 *     tags: [Prescription]
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
 *         description: Allergy prescriptions
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
router.get('/prescription/:id', userVerify, prescriptionController.getByIdPrescriptions);
router.get('/prescriptions/:user_id', userVerify, prescriptionController.getByUserIdPrescriptions);



module.exports = router;
