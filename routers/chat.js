// const router = require('express').Router();
// const chatController = require('../controllers/chatController');


// /**
//  * @swagger
//  * tags:
//  *   name: Chat
//  *   description: Chat management
//  */

//   /**
//    * @swagger
//    * /api/v1/chats:
//    *   post:
//    *     summary: Add a chat
//    *     tags: [Chat]
//    *     requestBody:
//    *       required: true
//    *       content:
//    *         application/json:
//    *           schema:
//    *             type: object
//    *             properties:
//    *               brandName:
//    *                 type: string
//    *                 example: John Doe
//    *               productName:
//    *                 type: string
//    *                 example: password123
//    *               productDescription:
//    *                 type: string
//    *                 example: John Doe
//    *               locationPurchased:
//    *                 type: string
//    *                 example: password123
//    *               openDate:
//    *                 type: string
//    *                 example: John Doe
//    *               type:
//    *                 type: string
//    *                 example: password123
//    *               expiryDate:
//    *                 type: string
//    *                 example: John Doe
//    *               galleryImage:
//    *                 type: string
//    *                 example: password123
//    *               takePhoto:
//    *                 type: string
//    *                 example: John Doe
//    *               cost:
//    *                 type: string
//    *                 example: password123
//    *     responses:
//    *       201:
//    *         description: New Chat....
//    *       400:
//    *         description: Bad request
//    *         content-type: application/json
//    *       401:
//    *         description: Unauthorized 
//    *         content-type: application/json
//    *       403:
//    *         description: Forbidden
//    *         content-type: application/json
//    *       404:
//    *         description: User not found
//    *         content-type: application/json
//    *       500:
//    *         description: Server Error
//    *         content-type: application/json
//    */
// router.post('/chats',chatController.chat);