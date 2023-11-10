const router = require("express").Router();
const Speakers = require("../../controllers/admin/speakers");
const adminVerify = require("../../middlewares/adminVerify");
const UserAdminVerify = require("../../middlewares/userAdminVerify");


/**
 * @swagger
 * tags:
 *   name: Speakers
 *   description: Events management
 */

  /**
   * @swagger
   * /api/v1/speakers:
   *   post:
   *     summary: Add new speaker
   *     tags: [Speakers]
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
   *               qualifications:
   *                 type: string
   *                 example: M.B.B.S/M.S
   *               image_url: 
   *                 type: string
   *                 example: http://example.com
   *     responses:
   *       200:
   *         description: Speaker added successfully....
   *       400:
   *         description: Bad request
   */
router.post("/speakers", adminVerify, Speakers.speakers);

/**
 * @swagger
 * /api/v1/speakers/{id}:
 *   get:
 *     summary: List of all speakers
 *     tags: [Speakers]
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
 *         description: Speakers event....
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
router.get("/speakers", UserAdminVerify, Speakers.getAllSpeakers);

/**
 * @swagger
 * /api/v1/speakers/{id}:
 *   get:
 *     summary: List by id speaker
 *     tags: [Speakers]
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
 *         description: Speakers event....
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
router.get("/speakers/:id", UserAdminVerify, Speakers.getByIdSpeakers);

/**
   * @swagger
   * /api/v1/speakers/{id}:
   *   put:
   *     summary: Update event for speakers
   *     tags: [Speakers]
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
   *               name:
   *                 type: string
   *                 example: Dr. John Smith
   *               qualifications:
   *                 type: string
   *                 example: M.B.B.S/M.S
   *               image_url: 
   *                 type: string
   *                 example: http://example.com
   *     responses:
   *       200:
   *         description: Speaker updated successfully....
   *       400:
   *         description: Bad request
   */
router.put("/speakers/:id", adminVerify, Speakers.updateByIdSpeakers);

module.exports = router;
