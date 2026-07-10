const express = require("express");
const enrollCourse = require("../Controller/StudentControllers/enrollmentController");
const verifyToken = require("../Middleware/verifyToken");
const allowedTo = require("../Middleware/allowedTo");
const enrollmentController = require("../Controller/StudentControllers/enrollmentController");
const Router = express.Router();
const path = require("path");

Router.use(verifyToken, allowedTo("Student"));

/**
 * @swagger
 * /student/enrollment:
 *   delete:
 *     summary: Unenroll student from a course
 *     tags:
 *       - Student
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - courseId
 *             properties:
 *               studentId:
 *                 type: string
 *               courseId:
 *                 type: string
 *     responses:
 *       200:
 *         description: course unenrolled successfully
 */
Router.route("/enrollment").delete(enrollmentController.unEnrollCourse);
/**
 * @swagger
 *  /student/enrollment/{studentId}:
 *    get:
 *      summary: get student with id
 *      description: return student data
 *      tags:
 *        - Student
 *      parameters:
 *        - name: studentId
 *          in: path
 *          required: true
 *          description: The ID of the student to get
 *          schema:
 *            type: string
 *      security:
 *          - bearerAuth: []
 *      responses:
 *       200:
 *          description: Success
 */
Router.route("/enrollment/:studentId").get(enrollmentController.getStudentData)

Router.get("/chat", (req, res) => {
    console.log(__dirname);
    
    res.sendFile(path.join(`C:/RodaMap/Phase 2/codeZone/Socket.io/FrontPages`, "index.html"));
  });

module.exports = Router;
