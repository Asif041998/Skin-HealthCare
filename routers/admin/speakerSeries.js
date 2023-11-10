const router = require('express').Router();
const Speaker = require('../../controllers/admin/speakerSeries');
const adminVerify = require('../../middlewares/adminVerify');
const UserAdminVerify = require('../../middlewares/userAdminVerify');

/**
 * @swagger
 * tags:
 *   name: Speakers-series
 *   description: Events management
 */

/**
 * @swagger
 * /api/v1/speaker-series:
 *   post:
 *     summary: Create a new event for speaker-series
 *     tags: [Speakers-series]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               program_id:
 *                 type: number
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: speaker-series
 *               description: 
 *                 type: string
 *                 example: Description of the speaker-series
 *               event_date: 
 *                 type: date
 *                 example: 2023-09-09
 *               image_url: 
 *                 type: string
 *                 example: http://example.com
 *               content_url: 
 *                 type: string
 *                 example: http://example.com
 *               status: 
 *                 type: string
 *                 example: active
 *               speaker_id:  
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Speaker-series event added successfully....
 *       400:
 *         description: Bad request
 */
router.post('/speaker-series', adminVerify, Speaker.speakerSeries);

/**
 * @swagger
 * /api/v1/speakers-series/{id}:
 *   get:
 *     summary: List by id speaker-series api
 *     tags: [Speakers-series]
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id  
 *          required: true
 *          description: Numeric ID required
 *     responses:
 *       200:
 *         description: Meditation event....
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
router.get('/speakers-series/:id', UserAdminVerify, Speaker.getByIdSpeakerSeries);

/**
 * @swagger
 * /api/v1/speaker-series/{program_id}:
 *   get:
 *     summary: List speaker-series by program_id
 *     tags: [Speakers-series]
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: program_id  
 *          required: true
 *          description: Numeric ID required
 *     responses:
 *       200:
 *         description: Meditation event....
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
router.get('/speaker-series/:program_id', UserAdminVerify, Speaker.getByProgramIdSpeakerSeries);

/**
   * @swagger
   * /api/v1/speaker-series/{id}:
   *   put:
   *     summary: Update event for speaker-series
   *     tags: [Speakers-series]
   *     parameters:
   *        - in: path
   *          name: program_id 
   *          required: true
   *          description: Numeric ID required
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               program_id:
   *                 type: number
   *                 example: 1
   *               title:
   *                 type: string
   *                 example: speaker-series
   *               description: 
   *                 type: string
   *                 example: Description of the speaker-series
   *               event_date: 
   *                 type: date
   *                 example: 2023-09-09
   *               image_url: 
   *                 type: string
   *                 example: http://example.com
   *               content_url: 
   *                 type: string
   *                 example: http://example.com
   *               status: 
   *                 type: string
   *                 example: active
   *               speaker_id:  
   *                 type: number
   *                 example: 1
   *     responses:
   *       200:
   *         description: Speaker-series event updated successfully....
   *       400:
   *         description: Bad request
   */
router.put('/speaker-series/:id', adminVerify, Speaker.updateSpeakerSeries);
// router.get('/speaker-series', Speaker.getAllSpeakerSeries);

module.exports = router;


