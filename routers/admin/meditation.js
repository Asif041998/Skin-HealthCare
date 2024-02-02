const router = require('express').Router();
const Meditation = require('../../controllers/admin/meditationController');
const adminVerify = require('../../middlewares/adminVerify');
const UserAdminVerify = require('../../middlewares/userAdminVerify');

/**
 * @swagger
 * tags:
 *   name: Meditations
 *   description: Events management
 */

/**
 * @swagger
 * /api/v1/meditations:
 *   post:
 *     summary: Create a new event for meditation
 *     tags: [Meditations]
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
 *                 example: Meditations
 *               description: 
 *                 type: string
 *                 example: Description of the Meditations
 *               image_url: 
 *                 type: string
 *                 example: http://example.com
 *               file_type: 
 *                 type: string
 *                 example: audio
 *               content_url: 
 *                 type: string
 *                 example: http://example.com
 *               status: 
 *                 type: string
 *                 example: active
 *     responses:
 *       200:
 *         description: Meditation event added successfully....
 *       400:
 *         description: Bad request
 */
router.post('/meditations', adminVerify, Meditation.meditation);
// router.get('/meditations', Meditation.getAllMeditations);

/**
 * @swagger
 * /api/v1/meditation/{id}:
 *   get:
 *     summary: List by id meditation api
 *     tags: [Meditations]
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
router.get('/meditation/:id', UserAdminVerify, Meditation.getByIdMeditations);

// /**
//  * @swagger
//  * /api/v1/meditations/{program_id}:
//  *   get:
//  *     summary: List by program_id meditation 
//  *     tags: [Events]
//  *     produces:
//  *       - application/json
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *        - in: path
//  *          name: id
//  *          required: true
//  *          description: Numeric ID required
//  *     responses:
//  *       200:
//  *         description: Meditation event....
//  *       400:
//  *         description: Bad request
//  *         content-type: application/json
//  *       401:
//  *         description: Unauthorized 
//  *         content-type: application/json
//  *       403:
//  *         description: Forbidden
//  *         content-type: application/json
//  *       404:
//  *         description: User not found
//  *         content-type: application/json
//  *       500:
//  *         description: Server Error
//  *         content-type: application/json
//  */

/**
 * @swagger
 * /api/v1/meditations/{program_id}:
 *   get:
 *     summary: List meditations by program_id
 *     tags: [Meditations]
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

router.get('/meditations/:program_id', UserAdminVerify, Meditation.getAllMeditations);
// router.get('/meditations/:program_id',[userVerify, adminVerify], Meditation.getAllMeditations)
/**
 * @swagger
 * /api/v1/meditations/{id}:
 *   put:
 *     summary: Update event for meditation
 *     tags: [Meditations]
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
 *                 example: Meditations
 *               description: 
 *                 type: string
 *                 example: Description of the Meditations
 *               image_url: 
 *                 type: string
 *                 example: http://example.com
 *               file_type: 
 *                 type: string
 *                 example: audio
 *               content_url: 
 *                 type: string
 *                 example: http://example.com
 *               status: 
 *                 type: string
 *                 example: active
 *     responses:
 *       200:
 *         description: Meditation event updated successfully....
 *         content:
 *             application/json:
 *                   schema: 
 *                      type: array
 *                      items:
 *                         $ref: '#components/schemas/events'
 *       400:
 *         description: Bad request
 */
router.put('/meditations/:id', adminVerify, Meditation.updateMeditations);

module.exports = router;