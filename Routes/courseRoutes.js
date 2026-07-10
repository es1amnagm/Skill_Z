const express = require("express");
const coursesController = require("../Controller/CourseControllers/courseControllers");
const verifyToken = require("../Middleware/verifyToken");
const allowedTo = require("../Middleware/allowedTo");
const Router = express.Router();

Router.use(verifyToken);

Router.route("/")
  /**
   * @swagger
   * /course:
   *   get:
   *     tags:
   *        - Course
   *     summary: Get paginated courses
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Success
   */
  .get(coursesController.getAllCourses);

/**
 * @swagger
 *  /course/{courseId}:
 *    get:
 *      summary: get course with id
 *      description: return course data
 *      tags:
 *        - Course
 *      parameters:
 *        - name: courseId
 *          in: path
 *          required: true
 *          description: The ID of the course to get
 *          schema:
 *            type: string
 *      security:
 *       - bearerAuth: []
 *      responses:
 *       200:
 *          description: Success
 */
Router.get("/:courseId", coursesController.getSingleCourseById);

/**
 * @swagger
 * /course/{courseId}:
 *   delete:
 *     summary: Delete course
 *     tags:
 *       - Course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Course deleted
 */

Router.delete("/:courseId",allowedTo("Admin"), coursesController.deleteCourse);

module.exports = Router;
