const router = require('express').Router();
const Programs = require('../../controllers/admin/programsController');
const adminVerify = require('../../middlewares/adminVerify');
const UserAdminVerify = require('../../middlewares/userAdminVerify');


/**
 * @swagger
 * tags:
 *   name: Programs
 *   description: Programs management
 */

/**
 * @swagger
 * /api/v1/programs:
 *   post:
 *     summary: Add new program
 *     tags: [Programs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dr. John Doe
 *               image_url: 
 *                 type: string
 *                 example: http://example.com
 *               is_active:
 *                 type: number
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: Add a title
 *               description:
 *                 type: string
 *                 example: Add a description
 *     responses:
 *       200:
 *         description: Speaker added successfully....
 *       400:
 *         description: Bad request
 */
router.post('/programs', adminVerify, Programs.programs);

/**
 * @swagger
 * /api/v1/programs:
 *   get:
 *     summary: All program
 *     tags: [Programs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Speaker added successfully....
 *       400:
 *         description: Bad request
 */
router.get('/programs', UserAdminVerify, Programs.getAllPrograms);

/**
 * @swagger
 * /api/v1/programs:
 *   put:
 *     summary: Update program
 *     tags: [Programs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dr. John Doe
 *               image_url: 
 *                 type: string
 *                 example: http://example.com
 *               is_active:
 *                 type: number
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: Add a title
 *               description:
 *                 type: string
 *                 example: Add a description
 *     responses:
 *       200:
 *         description: Speaker added successfully....
 *       400:
 *         description: Bad request
 */
router.put('/programs', adminVerify, Programs.updateByIdPrograms);

module.exports = router;