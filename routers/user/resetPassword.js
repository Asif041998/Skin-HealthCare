const router = require('express').Router();
const resetPassword = require('../../controllers/user/resetPassword');



  /**
   * @swagger
   * /api/v1/forgot-password:
   *   post:
   *     summary: Reset Password link generated....
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
   *     responses:
   *       200:
   *         description: Reset password link sent to your email....
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
router.post('/forgot-password', resetPassword.forgotPassword);

   /**
   * @swagger
   * /api/v1/reset-password/{reset_token}:
   *   put:
   *     summary: Reset Password
   *     tags: [Auth-User]
   *     parameters:
   *        - in: path
   *          name: reset_token
   *          required: true
   *          description: Numeric ID required
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
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
router.put ('/auth/reset-password/:reset_token', resetPassword.resetPassword);



module.exports = router;