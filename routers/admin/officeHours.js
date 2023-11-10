const router = require("express").Router();
const Office = require("../../controllers/admin/officehours");
const adminVerify = require("../../middlewares/adminVerify");
const UserAdminVerify = require("../../middlewares/userAdminVerify");


/**
 * @swagger
 * tags:
 *   name: Office-hours
 *   description: Events management
 */

/**
 * @swagger
 * /api/v1/office-hours:
 *   post:
 *     summary: Create a new event for office-hours
 *     tags: [Office-hours]
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
 *                 example: office-hours
 *               description: 
 *                 type: string
 *                 example: Description of the office-hours
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
 *         description: Office-hours event added successfully....
 *       400:
 *         description: Bad request
 */
router.post('/office-hours', adminVerify, Office.officeHours);

// router.get('/office-hours', Office.getAllOfficeHours);

/**
 * @swagger
 * /api/v1/office-hour/{id}:
 *   get:
 *     summary: List by id office-hour api
 *     tags: [Office-hours]
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
 *         description: Office-hour event....
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
router.get('/office-hour/:id', UserAdminVerify, Office.getByIdOfficeHours);

/**
 * @swagger
 * /api/v1/office-hours/{program_id}:
 *   get:
 *     summary: List office hours by program_id
 *     tags: [Office-hours]
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
router.get('/office-hours/:program_id', UserAdminVerify, Office.getByProgramIdOfficeHours);

/**
   * @swagger
   * /api/v1/office-hours/{id}:
   *   put:
   *     summary: Update event for office-hours
   *     tags: [Office-hours]
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
   *                 example: office-hours
   *               description: 
   *                 type: string
   *                 example: Description of the office-hours
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
   *         description: Office-hours event updated successfully....
   *       400:
   *         description: Bad request
   */
router.put('/office-hours/:id', adminVerify, Office.updateOfficeHours);

module.exports = router;
