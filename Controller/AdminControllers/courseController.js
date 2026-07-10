const Course = require("../../Models/courseModel");
const Instructor = require("../../Models/userModel");

const handleResponse = require("../../Middleware/handleResponse");
const asyncWrapper = require("../../Middleware/asyncWrapper");
const pagination = require("../../Middleware/pagination");

const checkUserId = require("../../Utils/checkUserId");
const { SUCCESS, FAIL, ERROR } = require("../../Utils/responseStatus");
const generateError = require("../../Utils/generateError");
const { findObjAndCheckExists } = require("../../Utils/findObjAndCheckExists");

let updateCourseOfInstructor = async (req, res) => {
  let { instructorId, courseId, state } = req.body;

  checkValidState(state);
  let course = await findObjAndCheckExists(Course, courseId);

  let instructor = await findObjAndCheckExists(Instructor, instructorId);

  await Course.updateOne(
    { _id: courseId },
    { $set: { state: state } },
    { runValidator: true },
  );

  return handleResponse(res, 200, SUCCESS, `course ${state} successfully`);
};

module.exports = { updateCourseOfInstructor };
let checkValidState = (state) => {
  let states = ["Waiting", "Accepted", "Rejected"];
  if (!states.includes(state)) throw generateError(404, FAIL, "Invalid state");
};
