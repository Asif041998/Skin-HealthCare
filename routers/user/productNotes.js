const router = require('express').Router();
const productNotesController = require('../../controllers/user/productNotes');
const userVerify = require('../../middlewares/userVerify');

/**
 * @swagger
 * tags:
 *   name: Product-Notes
 *   description: Products management
 */

  /**
   * @swagger
   * /api/v1/product-notes:
   *   post:
   *     summary: Add product notes to the product
   *     tags: [Product-Notes]
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
   *         description: Product notes added successfully....
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
router.post('/product-notes', userVerify, productNotesController.productNotes);

/**
 * @swagger
 * /api/v1/product-notes:
 *   get:
 *     summary: List all product-notes
 *     tags: [Product-Notes]
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All product Notes....
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
router.get('/product-notes', userVerify, productNotesController.getAllProductNotes);

/**
 * @swagger
 * /api/v1/product-notes/{id}:
 *   put:
 *     summary: Update product notes by id
 *     tags: [Product-Notes]
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
 *         description: Products notes updated successfully....
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
router.put('/product-notes/:id', userVerify, productNotesController.updateByIdProductNotes);

/**
 * @swagger
 * /api/v1/product-notes/{user_product_id}:
 *   put:
 *     summary: Fetch product notes by user_product_id
 *     tags: [Product-Notes]
 *     parameters:
 *        - in: path
 *          name: user_product_id 
 *          required: true
 *          description: Numeric ID required
 *     responses:
 *       200:
 *         description: Products notes fetched successfully....
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
router.get('/product-note/:user_product_id', userVerify, productNotesController.getByUserProductIdProductNotes);

/**
 * @swagger
 * /api/v1/product-notes/{id}:
 *   get:
 *     summary: get Product notes by id... 
 *     tags: [Product-Notes]
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
router.get('/product-notes/:id', userVerify, productNotesController.getByIdProductNotes);



module.exports = router;
