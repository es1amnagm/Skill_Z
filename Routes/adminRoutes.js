const express = require("express");

const Router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const allowedTo = require("../Middleware/allowedTo");
const AdminUsers = require("../Controller/AdminControllers/userController");
const AdminCourses = require("../Controller/AdminControllers/courseController");
const path = require('path')
Router.use(verifyToken, allowedTo("Admin"));

Router.route("/")
  /**
   * @swagger
   * /admin:
   *   get:
   *     tags:
   *       - Admin
   *     security:
   *       - bearerAuth: []
   *     summary: Get all users
   *     description: Returns all users
   *     responses:
   *       200:
   *         description: Success
   */
  .get(AdminUsers.getAllUsers)

  /**
   * @swagger
   * /admin:
   *   patch:
   *     tags:
   *       - Admin
   *
   *     summary: Update course state
   *
   *     description: Returns course with updated state
   *
   *     security:
   *       - bearerAuth: []
   *
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *
   *             required:
   *               - instructorId
   *               - courseId
   *               - state
   *
   *             properties:
   *               instructorId:
   *                 type: string
   *
   *               courseId:
   *                 type: string
   *
   *               state:
   *                 type: string
   *
   *     responses:
   *       200:
   *         description: Success
   */
  .patch(AdminCourses.updateCourseOfInstructor);

Router.route("/:userId")
  /**
   * @swagger
   *  /admin/{userId}:
   *    get:
   *      summary: get user with id
   *      description: return user data using id
   *      tags:
   *        - Admin
   *
   *      parameters:
   *         - in: path
   *           name: userId
   *           required: true
   *           schema:
   *             type: string
   *
   *      security:
   *       - bearerAuth: []
   *      responses:
   *       200:
   *          description: Success
   */

  .get(AdminUsers.getSingleUser)
  /**
   * @swagger
   * /admin/{userId}:
   *   patch:
   *     summary: Update user
   *     tags:
   *       - Admin
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               gender:
   *                 type: string
   *               birthDate:
   *                 type: string
   *               role:
   *                 type: string
   *               phone:
   *                 type: string
   *               avatar:
   *                 type: string
   *                 format: binary
   *               balance:
   *                 type: number
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Course updated
   */
  .patch(AdminUsers.updateUser)
  /**
   * @swagger
   * /admin/{userId}:
   *   delete:
   *     summary: Delete user
   *     tags:
   *       - Admin
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Course deleted
   */
  .delete(AdminUsers.deleteUser);
  Router.get("/chat", (req, res) => {
     
    res.sendFile(path.join(`C:/RodaMap/Phase 2/codeZone/Socket.io/FrontPages`, "index.html"));
  });
module.exports = Router;
