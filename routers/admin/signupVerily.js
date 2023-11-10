const router = require('express').Router();
const signupVerilyController = require('../../controllers/admin/verily');
const userVerify = require('../../middlewares/userVerify');

// Register a new user

/**
 * @swagger
 * tags:
 *   name: Auth-User Verily
 *   description: Auth-User Verily management
 */

  /**
   * @swagger
   * /api/v1/signup/verily:
   *   post:
   *     summary: Create a new user
   *     tags: [Auth-User Verily]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName:
   *                 type: string
   *                 example: John 
   *               lastName: 
   *                 type: string
   *                 example: Doe
   *               email:
   *                 type: string
   *                 example: john.doe@gmail.com
   *               zipCode:
   *                 type: string
   *                 example: 123456
   *     responses:
   *       200:
   *         description: User created Successfully....
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
router.post('/signup/verily',userVerify, signupVerilyController.registerVerilyUser);
router.get('/signup/verily',userVerify, signupVerilyController.getAllVerilyUser);
router.get('/signup/verily/:id', userVerify,signupVerilyController.getVerilyUserById);
router.put('/signup/verily/:id',userVerify, signupVerilyController.updateVerilyUser);

module.exports = router;