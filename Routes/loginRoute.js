const express = require("express");

const login = require("../Controller/Authentication/login");

const Router = express.Router();

Router.route("/").post(login);

module.exports = Router;

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Register user
 *    tags:
 *        - Auth
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *                 email:
 *                   type: string
 *                 password:
 *                     type: string
 *    responses:
 *         201:
 *            description: User registered successfully

 */
