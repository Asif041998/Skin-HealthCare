const router = require('express').Router();
const routineController = require('../../controllers/user/routines');


/**
 * @swagger
 * tags:
 *   name: SkinCare-Routine
 *   description: SkinCare-Routine management
 */

  /**
   * @swagger
   * /api/v1/routines:
   *   post:
   *     summary: Add routines
   *     tags: [SkinCare-Routine]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               timeFrame:
   *                 type: string
   *                 example: Night
   *               productsUsed:
   *                 type: string
   *                 example: Honey Halo
   *               facialTreatments:
   *                 type: string
   *                 example: Chemical Peels
   *     responses:
   *       200:
   *         description: Skincare routine added successfully....
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
router.post('/routines',routineController.routines);

  // /**
  //  * @swagger
  //  * /api/v1/skincare/note:
  //  *   post:
  //  *     summary: Add a Skincare note
  //  *     tags: [SkinCare]
  //  *     requestBody:
  //  *       required: true
  //  *       content:
  //  *         application/json:
  //  *           schema:
  //  *             type: object
  //  *             properties:
  //  *               date:
  //  *                 type: string
  //  *                 example: 04/07/2023
  //  *               comment:
  //  *                 type: string
  //  *                 example: Currently skin is good enough.
  //  *     responses:
  //  *       200:
  //  *         description: Skincare note added successfully....
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
  // router.post('/routine-notes', routineController.routineNote);

// /**
//  * @swagger
//  * /api/v1/routines:
//  *   get:
//  *     summary: List all Skincare routines
//  *     tags: [SkinCare-Routine]
//  *     produces:
//  *       - application/json
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: All Skincare routines....
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
// router.get('/routines', routineController.getAllRoutines);

/**
 * @swagger
 * /api/v1/routines/{id}:
 *   put:
 *     summary: Update Skincare routine
 *     tags: [SkinCare-Routine]
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
 *         description: Skincare routine updated....
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
router.put('/routines/:id', routineController.updateByIdRoutines);


/**
 * @swagger
 * /api/v1/routines/{id}:
 *   get:
 *     summary: Update Skincare routine
 *     tags: [SkinCare-Routine]
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
 *         description: Skincare routine updated....
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
router.get('/routine/:id', routineController.getByIdRoutines);

/**
 * @swagger
 * /api/v1/routines/{user_id}:
 *   get:
 *     summary: Delete a routine
 *     tags: [SkinCare-Routine]
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
 *         description: Routine deleted....
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
router.get('/routines/:user_id', routineController.getByUserIdRoutines);

module.exports = router;
