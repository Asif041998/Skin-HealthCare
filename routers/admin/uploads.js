const router = require('express').Router();
const Uploads = require('../../controllers/admin/uploads');
const upload = require('../../middlewares/uploads');



/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: Uploads API
 */

  /**
   * @swagger
   * /api/v1/uploads:
   *   post:
   *     summary: Add new image, video or audio file 
   *     tags: [Uploads]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               image_url: 
   *                 type: string
   *                 example: http://example.com
   *     responses:
   *       200:
   *         description: File uploaded successfully....
   *       400:
   *         description: Bad request
   */
router.post('/uploads', upload.single('file'), Uploads.uploadFile);

module.exports = router;
