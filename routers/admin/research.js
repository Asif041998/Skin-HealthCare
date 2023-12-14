const router = require('express').Router();
const research = require('../../controllers/admin/research');
const adminVerify = require('../../middlewares/adminVerify');
const userVerify = require('../../middlewares/userVerify');
const UserAdminVerify = require('../../middlewares/userAdminVerify');


/**
 * @swagger
 * tags:
 *   name: Research
 *   description: Research management
 */

  /**
   * @swagger
   * /api/v1/research:
   *   post:
   *     summary: Add new program
   *     tags: [Research]
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
   *         description: Research added successfully....
   *       400:
   *         description: Bad request
   */
router.post('/research', adminVerify, research.research);

  /**
   * @swagger
   * /api/v1/research:
   *   get:
   *     summary: All research's
   *     tags: [Research]
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
router.get('/research', UserAdminVerify, research.getAllResearch);


 /**
   * @swagger
   * /api/v1/research:
   *   get:
   *     summary: All research's
   *     tags: [Research]
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
router.get('/research/:id', UserAdminVerify, research.getByIdResearch);

  /**
   * @swagger
   * /api/v1/research/{id}:
   *   put:
   *     summary: Update program
   *     tags: [Research]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 example: research title
   *               description: 
   *                 type: string
   *                 example: Write the description of the research
   *               impact:
   *                 type: string
   *                 example: Write the how does it's making an impact
   *               works:
   *                 type: string
   *                 example: Write how does it works
   *     responses:
   *       200:
   *         description: Research updated successfully....
   *       400:
   *         description: Bad request
   */
router.put('/research/:id', adminVerify, research.updateByIdResearch);

  /**
   * @swagger
   * /api/v1/research/{id}:
   *   delete:
   *     summary: Delete research
   *     tags: [Research]
   *     responses:
   *       200:
   *         description: Research Deleted successfully....
   *       400:
   *         description: Bad request
   */
router.delete('/research/:id', adminVerify, research.deleteByIdResearch);

module.exports = router;