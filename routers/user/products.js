const router = require('express').Router();
const ProductController = require('../../controllers/user/products');
const userVerify = require('../../middlewares/userVerify');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uploadImage:
 *                 type: string
 *                 example: honeyHalo.png
 *               brandName:
 *                 type: string
 *                 example: Farmacy
 *               productName:
 *                 type: string
 *                 example: Honey Halo
 *               productDescription:
 *                 type: string
 *                 example: An ultra-hydrating ceramide moisturizer clinically proven to visibly plump, improve the look of fine lines and replenish dry, distressed skin.
 *               locationPurchased:
 *                 type: string
 *                 example: Texas
 *               openDate:
 *                 type: string
 *                 example: 04/07/2023
 *               type:
 *                 type: string
 *                 example: Moisturizer
 *               expiryDate:
 *                 type: string
 *                 example: 29/12/2024
 *               cost:
 *                 type: string
 *                 example: $119
 *     responses:
 *       200:
 *         description: Product added successfully....
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
router.post('/products', userVerify, ProductController.products);

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All Products....
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
router.get('/products', userVerify, ProductController.getAllProducts);

/**
 * @swagger
 * /api/v1/products/:id:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uploadImage:
 *                 type: string
 *                 example: honeyHalo.png
 *               brandName:
 *                 type: string
 *                 example: Farmacy
 *               productName:
 *                 type: string
 *                 example: Honey Halo
 *               productDescription:
 *                 type: string
 *                 example: An ultra-hydrating ceramide moisturizer clinically proven to visibly plump, improve the look of fine lines and replenish dry, distressed skin.
 *               locationPurchased:
 *                 type: string
 *                 example: Texas
 *               openDate:
 *                 type: string
 *                 example: 04/07/2023
 *               type:
 *                 type: string
 *                 example: Moisturizer
 *               expiryDate:
 *                 type: string
 *                 example: 29/12/2024
 *               cost:
 *                 type: string
 *                 example: $119
 *     responses:
 *       200:
 *         description: Product updated successfully....
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
router.put('/products/:id', userVerify, ProductController.updateProducts);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get by ID products.....
 *     tags: [Products]
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
 *         description: Product fetched....
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
router.get('/product/:id', userVerify, ProductController.getByIdProducts);

/**
 * @swagger
 * /api/v1/products/{user_id}:
 *   get:
 *     summary: Get product by user_id.....
 *     tags: [Products]
 *     parameters:
 *        - in: path
 *          name: user_id 
 *          required: true
 *          description: Numeric ID required
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Product fetched by user_id....
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
router.get('/products/:user_id',userVerify, ProductController.getByUserIdProducts);

module.exports = router;
