const router = require('express').Router();
const ListUsersController = require('../../controllers/admin/listUsersController');
const adminVerify = require('../../middlewares/adminVerify');
const userVerify = require('../../middlewares/userVerify');

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: List all users
 *     tags: [Auth-User]
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All Users....
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
router.get('/users',adminVerify, ListUsersController.listUsers);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: List user by id
 *     tags: [Auth-User]
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
 *         description: OK
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
router.get('/user/:id',adminVerify, ListUsersController.getUserById);

// /**
//    * @swagger
//    * /api/v1/users/:id:
//    *   put:
//    *     summary: Create a new user
//    *     tags: [Auth-User]
//    *     requestBody:
//    *       required: true
//    *       content:
//    *         application/json:
//    *           schema:
//    *             type: object
//    *             properties:
//    *               firstName:
//    *                 type: string
//    *                 example: John 
//    *               lastName: 
//    *                 type: string
//    *                 example: Doe
//    *               email:
//    *                 type: string
//    *                 example: john.doe@gmail.com
//    *               password:
//    *                 type: string
//    *                 example: password123
//    *               role: 
//    *                 type: string
//    *                 example: user
//    *               state: 
//    *                 type: string
//    *                 example: Texas
//    *               DOB_year: 
//    *                 type: integer
//    *                 example: 1993
//    *               predominant: 
//    *                 type: string
//    *                 example: American Indian or Alaskan Native
//    *     responses:
//    *       200:
//    *         description: User created Successfully....
//    *       400:
//    *         description: Bad request
//    */
// router.put('/users/:id', ListUsersController.updateUsers);

// /**
//  * @swagger
//  * /api/v1/users/:id:
//  *   delete:
//  *     summary: Delete User by ID
//  *     tags: [Auth-User]
//  *     produces:
//  *       - application/json
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: User deleted....
//  *       401:
//  *         description: Unauthorized....
//  */
// router.delete('/users/:id', ListUsersController.deleteUsers);



module.exports = router;