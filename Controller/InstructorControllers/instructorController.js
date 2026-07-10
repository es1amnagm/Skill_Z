let Course = require("../../Models/courseModel");

let handleResponse = require("../../Middleware/handleResponse");
let asyncWrapper = require("../../Middleware/asyncWrapper");
const pagination = require("../../Middleware/pagination");
const checkUserId = require("../../Utils/checkUserId");
let { SUCCESS, FAIL, ERROR } = require("../../Utils/responseStatus");
const generateError = require("../../Utils/generateError");
const { findObjAndCheckExists } = require("../../Utils/findObjAndCheckExists");

let addCourse = asyncWrapper(async (req, res, next) => {
  let courseBody = req.body;

  let newCourse = new Course(courseBody);

  await newCourse.save();

  return handleResponse(res, 201, SUCCESS, {
    course: newCourse,
    message: "course added successfully",
  });
});

let cancelCourse = asyncWrapper(async (req, res, next) => {
  let { instructorId, courseId } = req.body;

  checkUserId(req.currentUser.id, instructorId);

  let course = await findObjAndCheckExists(Course, courseId);

  let courseDate = course.date;
  await checkDateValidToCancel(courseDate);
  checkCourseStateStillWaiting(course);
  await Course.deleteOne({ _id: courseId });
  return handleResponse(res, 200, SUCCESS, "course deleted successfully");
});

module.exports = {
  addCourse,
  cancelCourse,
};

let checkDateValidToCancel = async (courseDate) => {
  let now = new Date();
  let diff = (now - courseDate) / (1000 * 60 * 60 * 24);
  if (diff > 1)
    throw generateError(
      400,
      FAIL,
      "sorry but you can't cancel this course after 24 hours",
    );
};

let checkCourseStateStillWaiting = async (course) => {
  if (course.state !== "Waiting") {
    throw generateError(
      400,
      FAIL,
      `Sorry, but this course is ${course.state} so you can't cancel it`,
    );
  }
};
