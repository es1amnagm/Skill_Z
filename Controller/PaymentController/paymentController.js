const stripe = require("../../Config/stripeConfig");

const paymentService = require("../../Services/paymentService");

const Course = require("../../Models/courseModel");

const Payment = require("../../Models/paymentModel");

const StudentCourses = require("../../Models/studentCoursesModel");

const asyncWrapper = require("../../Middleware/asyncWrapper");

let generateError = require('../../Utils/generateError')
const { SUCCESS,FAIL } = require("../../Utils/responseStatus");
const Student =  require('../../Models/userModel')
const handleResponse = require("../../Middleware/handleResponse");
const studentCoursesModel = require("../../Models/studentCoursesModel");
const {findObjAndCheckExists} =   require('../../Utils/findObjAndCheckExists')  
const createCheckout = asyncWrapper(async (req, res, next) => {
  const { courseId } = req.body;
  const user = req.currentUser;
  let course = await findObjAndCheckExists(Course, courseId);
  let student = await findObjAndCheckExists(Student, user.id);
  let studentCourse = await checkEnrolled(studentCoursesModel, user.id, courseId);

  if (studentCourse)
    throw generateError(400, FAIL, "this course already enrolled"); 

  const session = await paymentService.createCheckoutSession({
    course,
    user,
  });

  return handleResponse(res, 200, SUCCESS, {
    checkoutUrl: session.url,
  });
});

const handleWebhook = asyncWrapper(async (req, res,next) => {
  const signature = req.headers["stripe-signature"];
  let event;


  event = stripe.webhooks.constructEvent(
    req.body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const { userId, courseId,price } = session.metadata || {};
    if (!userId || !courseId||!price) {
      return res.status(400).json({ message: "Invalid metadata" });
    }

    const existingPayment = await Payment.findOne({
      stripeSessionId: session.id,
    });

    if (existingPayment)
      return res.status(200).json({ message: "Already processed" });
    await Payment.create({
      userId,
      courseId,
      stripeSessionId: session.id,
      paymentIntentId: session.payment_intent,
      amount: session.amount_total / 100,
      currency: session.currency,
      paymentStatus: "Paid",
    });

    await StudentCourses.create({
      studentId: userId,
      courseId,
    });

   

    console.log("payment saved successfully");
  }

  return res.status(200).json({
    received: true,
  });
});

module.exports = {
  createCheckout,
  handleWebhook,
};



let checkEnrolled = async (studentCourses, studentId, courseId) => {
  let studentCourse = await studentCourses.findOne({
    $and: [{ studentId }, { courseId }],
  });

  return studentCourse;
};