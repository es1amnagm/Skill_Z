const express = require("express");

const Router = express.Router();

const paymentController = require("../Controller/PaymentController/paymentController");
const enrollmentController = require("../Controller/StudentControllers/enrollmentController");

const verifyToken = require("../Middleware/verifyToken");
// Router.use(verifyToken);
/**
 * @swagger
 * /payment/checkout:
 *  post:
 *    summary: start payment session
 *    tags:
 *        - Payment
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *           schema:
 *            type: object
 *            required:
 *              - courseId
  *            properties:
 *                 courseId:
 *                   type: string
 *    security:
 *       - bearerAuth: []
 *    responses:
 *         200:
 *            description: payment session started

 */
Router.post(
  "/checkout",
  verifyToken,
  express.json(),
  paymentController.createCheckout,
);

/**
 * @swagger
 * /payment/webhook:
 *   post:
 *     summary: Stripe webhook to process payment checkout events
 *     tags:
 *       - Payment
 *     parameters:
 *       - in: header
 *         name: stripe-signature
 *         required: true
 *         schema:
 *           type: string
 *         description: Stripe webhook signature header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Raw Stripe event object
 *     responses:
 *       200:
 *         description: Event received and processed successfully
 *       400:
 *         description: Invalid signature or metadata
 */
Router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleWebhook,
);

module.exports = Router;
