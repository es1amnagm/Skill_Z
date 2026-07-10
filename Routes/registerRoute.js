const express = require("express"); 
const register = require("../Controller/Authentication/register");
const upload = require("../Middleware/multer");

const Router = express.Router();


Router.post("/", upload.single("avatar"), register);

module.exports = Router;

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - gender
 *               - birthDate
 *               - role
 *               - phone
 *               - balance
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
 *     responses:
 *       201:
 *         description: User registered successfully
 */