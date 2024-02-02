const router = require('express').Router();
const userController = require('../../controllers/user/userController');
const userVerify = require('../../middlewares/userVerify')

// Register a new user

/**
 * @swagger
 * tags:
 *   name: Auth-User
 *   description: Auth-User management
 */

/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth-User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John 
 *               lastname: 
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *               state: 
 *                 type: number
 *                 example: 1
 *               birth_year: 
 *                 type: integer
 *                 example: 1993
 *               race_id: 
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: User registered successfully....
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
router.post('/signup', userController.registerUser);

router.put('/user/:id', userVerify, userController.updateUser);
router.delete('/user/:id', userVerify, userController.deleteUser);
router.post('/contact-us', userVerify, userController.contactUs);

/**
  * @swagger
  * /api/v1/signin:
  *   post:
  *     summary: Login User
  *     tags: [Auth-User]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               email:
  *                 type: string
  *                 example: johndoe@gmail.com
  *               password:
  *                 type: string
  *                 example: password123
  *     responses:
  *       200:
  *         description: User Logged In Successfully....
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
router.post('/signin', userController.loginUser);
//  router.post('/check-email', userController.checkEmail);


module.exports = router;