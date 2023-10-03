const router = require('express').Router();
const routineNotesController = require('../../controllers/user/routineNotes');
const userVerify = require('../../middlewares/userVerify')
/**
 * @swagger
 * tags:
 *   name: Skin-Care Routine notes
 *   description: Routine notes management
 */

  /**
   * @swagger
   * /api/v1/routine-notes:
   *   post:
   *     summary: Add a new routine notes
   *     tags: [Skin-Care Routine notes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               date:
   *                 type: date
   *                 example: 2023-09-09
   *               comment:
   *                 type: string
   *                 example: Comment for the new routine notes
   *     responses:
   *       200:
   *         description: Routine notes added successfully....
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
  router.post('/routine-notes', userVerify,routineNotesController.routineNotes);

  /**
 * @swagger
 * /api/v1/routine-notes:
 *   get:
 *     summary: List all routines notes
 *     tags: [Skin-Care Routine notes]
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All routine notes....
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
  router.get('/routine-notes',userVerify, routineNotesController.getAllRoutineNotes);

    /**
   * @swagger
   * /api/v1/routine-notes/{id}:
   *   put:
   *     summary: Update routine notes by ID........
   *     tags: [Skin-Care Routine notes]
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
   *               date:
   *                 type: date
   *                 example: 2023-09-09
   *               comment:
   *                 type: string
   *                 example: Comment for the new routine notes
   *     responses:
   *       200:
   *         description: Routine notes added successfully....
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
  router.put('/routine-notes/:id',userVerify, routineNotesController.updateByIdRoutineNotes);

    /**
 * @swagger
 * /api/v1/routine-notes/{id}:
 *   get:
 *     summary: List routines notes by ID........
 *     tags: [Skin-Care Routine notes]
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
 *         description: Routine notes by ID....
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
  router.get('/routine-note/:id',userVerify, routineNotesController.getByIdRoutineNotes);


//       /**
//  * @swagger
//  * /api/v1/routine-notes/{user_skin_care_routine_id}:
//  *   get:
//  *     summary: List routines notes by user skin care routine ID........
//  *     tags: [Skin-Care Routine notes]
//  *     parameters:
//  *        - in: path
//  *          name: id 
//  *          required: true
//  *          description: Numeric ID required
//  *     produces:
//  *       - application/json
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Routine notes by user skin care routine ID....
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
//       router.get('/routine-notes/:user_skin_care_routine_id', routineNotesController.getByUserSkinCareIdRoutineNotes);


            /**
 * @swagger
 * /api/v1/routine-notes/{user_skin_care_routine_id}:
 *   get:
 *     summary: List routines notes by user ID........
 *     tags: [Skin-Care Routine notes]
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
 *         description: Routine notes by user ID....
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
  router.get('/routine-notes/:user_id',userVerify, routineNotesController.getByUserIdRoutineNotes);


            /**
 * @swagger
 * /api/v1/routine-notes:
 *   get:
 *     summary: List routines notes by user ID........
 *     tags: [Skin-Care Routine notes]
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
 *         description: Routine notes by user ID....
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
  router.get('/routine-notes',userVerify, routineNotesController.getByUserIdRoutineNotes);

  module.exports = router;
