const express = require("express");
const Router = express.Router();
const Instructor = require("../Controller/InstructorControllers/instructorController");
const Course = require("../Controller/CourseControllers/courseControllers");
const verifyToken = require("../Middleware/verifyToken");
const allowedTo = require("../Middleware/allowedTo");
 
Router.use(verifyToken, allowedTo("Instructor"));
Router.route("/")
  /**
   * @swagger
   * /instructor:
   *   get:
   *     summary: Get all instructor courses
   *     description: Returns instructor courses
   *     tags:
   *       - Instructor
   *
   *     security:
   *       - bearerAuth: []
   *
   *     parameters:
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *
   *       - in: query
   *         name: state
   *         schema:
   *           type: string
   *
   *     responses:
   *       200:
   *         description: Success
   */
  .get(Course.getAllCourses)
  /**
   * @swagger
   * /instructor:
   *   post:
   *     summary: add course
   *     tags:
   *       - Instructor
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - instructorId
   *               - name
   *               - price
   *               - videoUrls
   *               - state
   *               - date
   *             properties:
   *               instructorId:
   *                 type: string
   *               name:
   *                 type: string
   *               price:
   *                 type: number
   *               videoUrls:
   *                 type: array
   *                 items:
   *                    type: object
   *               state:
   *                 type: string
   *               date:
   *                 type: string
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       201:
   *         description: User registered successfully
   */
  .post(Instructor.addCourse)
  /**
   * @swagger
   * /instructor:
   *   delete:
   *     summary: Cancel course
   *     tags:
   *       - Instructor
   *     description: cancel course before admin accept or reject and before 24H
   *     requestBody:
   *      required: true
   *      content:
   *          application/json:
   *           schema:
   *            type: object
   *            required:
   *              - instructorId
   *              - courseId
   *            properties:
   *                 instructorId:
   *                   type: string
   *                 courseId:
   *                     type: string
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Course canceled
   */
  .delete(Instructor.cancelCourse);

module.exports = Router;
