const router = require('express').Router();
const notificationController = require('../../controllers/user/notifications');
const adminVerify = require('../../middlewares/adminVerify');
const userVerify = require('../../middlewares/userVerify');

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Notification management
 */

/**
 * @swagger
 * /api/v1/notifications:
 *   post:
 *     summary: New notification
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content: 
 *                 type: string
 *                 example: Skin dryness
 *               timeFrame:
 *                 type: string
 *                 example: 1 week
 *     responses:
 *       200:
 *         description: Notification sent Successfully....
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
router.get('/notifications', userVerify, notificationController.notification);
router.post('/notifications', adminVerify, notificationController.notifications);
/**
 * @swagger
 * /api/v1/notifications:
 *   get:
 *     summary: All notifications 
 *     tags: [Notification]
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description:  All notifications received....
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
router.get('/notifications/:user_id', userVerify, notificationController.getByUserIdNotifications);
router.get('/notification', adminVerify, notificationController.getNotification);
router.put('/notifications/:id', userVerify, notificationController.updateNotification);
router.delete('/notification/:id', adminVerify, notificationController.deleteNotification);
/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   put:
 *     summary: Update notification
 *     tags: [Notification]
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
 *         description: Notification updated....
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
// router.put('/notifications/:id', notificationController.updateNotification);

/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   delete:
 *     summary: Delete notification
 *     tags: [Notification]
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
 *         description: Notification deleted....
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
// router.delete('/notifications/:id', notificationController.deleteNotification)

module.exports = router;
