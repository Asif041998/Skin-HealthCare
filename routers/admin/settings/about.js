const router = require('express').Router();
const About = require('../../../controllers/admin/settings/about');
const adminVerify = require('../../../middlewares/adminVerify');
const userVerify = require('../../../middlewares/userVerify');

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Settings management
 */

/**
 * @swagger
 * /api/v1/settings/about:
 *   post:
 *     summary: Add about settings
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mission:
 *                 type: number
 *                 example: About Mission
 *               approach:
 *                 type: string
 *                 example: About Approach
 *     responses:
 *       200:
 *         description: About settings added successfully....
 *       400:
 *         description: Bad request
 */
router.post('/settings/about', adminVerify, About.about);

/**
  * @swagger
  * /api/v1/settings/about:
  *   get:
  *     summary: Fetch all about settings
  *     tags: [Settings]
  *     responses:
  *       200:
  *         description: Fetched all settings successfully....
  *       400:
  *         description: Bad request
  */
router.get('/settings/about', About.getAllAbout);

/**
  * @swagger
  * /api/v1/settings/about/{id}:
  *   put:
  *     summary: Update about settings
  *     tags: [Settings]
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
  *               mission:
  *                 type: number
  *                 example: About Mission
  *               approach:
  *                 type: string
  *                 example: About Approach
  *     responses:
  *       200:
  *         description: About settings updated successfully....
  *       400:
  *         description: Bad request
  */
router.put('/settings/about/:id', adminVerify, About.updateAbout);

/**
  * @swagger
  * /api/v1/settings/about/{id}:
  *   delete:
  *     summary: Delete about settings
  *     tags: [Settings]
  *     parameters:
  *        - in: path
  *          name: id 
  *          required: true
  *          description: Numeric ID required
  *     responses:
  *       200:
  *         description: About settings deleted successfully....
  *       400:
  *         description: Bad request
  */
router.delete('/settings/about/:id', adminVerify, About.deleteAbout);

module.exports = router;