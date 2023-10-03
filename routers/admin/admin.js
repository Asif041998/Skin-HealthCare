const router = require('express').Router();
const adminController = require('../../controllers/admin/adminController');
const adminVerify = require('../../middlewares/adminVerify');


/**
 * @swagger
 * tags:
 *   name: Auth-Admin
 *   description: Auth-Admin management
 */

  /**
   * @swagger
   * /api/v1/admin/register:
   *   post:
   *     summary: Create a new admin
   *     tags: [Auth-Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: john.doe@gmail.com
   *               password:
   *                 type: string
   *                 example: password123
   *               roles: 
   *                 type: string
   *                 example: admin
   *     responses:
   *       200:
   *         description: User created Successfully....
   *       400:
   *         description: Bad request
   */
router.post('/admin/register', adminController.registerAdmin);

 /**
   * @swagger
   * /api/v1/admin/login:
   *   post:
   *     summary:  Admin Login
   *     tags: [Auth-Admin]
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
 router.post('/admin/login', adminController.loginAdmin);


  /**
   * @swagger
   * /api/v1/admin/logout:
   *   post:
   *     summary:  Admin Logout
   *     tags: [Auth-Admin]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
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
  router.post('/admin/logout', adminController.logOutAdmin);


    /**
   * @swagger
   * /api/v1/change-password/{id}:
   *   put:
   *     summary: Reset Password
   *     tags: [Auth-Admin]
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
   *               currentPassword:
   *                 type: string
   *                 example: 123456
   *               newPassword:
   *                 type: string
   *                 example: 12345678
   *               confirmPassword:
   *                 type: string
   *                 example: 12345678 
   *     responses:
   *       200:
   *         description: Password reset successful....
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
router.put('/change-password/:id', adminVerify, adminController.changePassword);


module.exports = router;