let Course = require("../../Models/courseModel");
let Instructor = require("../../Models/userModel");

let handleResponse = require("../../Middleware/handleResponse");
let asyncWrapper = require("../../Middleware/asyncWrapper");
const pagination = require("../../Middleware/pagination");
const checkUserId = require("../../Utils/checkUserId");
let { SUCCESS, FAIL, ERROR } = require("../../Utils/responseStatus");
const generateError = require("../../Utils/generateError");
const { findObjAndCheckExists } = require("../../Utils/findObjAndCheckExists");

let getAllCourses = asyncWrapper(async (req, res, next) => {
  let { limit, skip } = pagination(req);
  let filter = {state:"Accepted"};
  let projection = { __v: 0 };
  console.log(req.currentUser.role);
  if (req.currentUser.role === "Student"){
    projection = { name: 1, price: 1, videoUrls: 1,_id:0 };
  }
  else filter = checkQuery(req);

  console.log("filet",filter)
  console.log("projection", projection);
  let courses = await Course.find(filter, projection).limit(limit).skip(skip);

  if (courses.length === 0)
    return next(generateError(404, FAIL, "no courses yet"));

  return handleResponse(res, 200, SUCCESS, courses);
});

let getSingleCourseById = asyncWrapper(async (req, res, next) => {
  let courseId = req.params.courseId;

  let course = await findObjAndCheckExists(Course, courseId);

  return handleResponse(res, 200, SUCCESS, course);
});

let updateCourseOfInstructor = async (req, res) => {
  let { instructorId, courseId, state } = req.body;

  let body = req.body;

  let course = await findObjAndCheckExists(Course, courseId);
  let instructor = await findObjAndCheckExists(Instructor, instructorId);

  // await checkValidState( state);

  await Course.updateOne(
    { _id: courseId },
    { $set: { state: state } },
    { runValidator: true },
  );

  return handleResponse(res, 200, SUCCESS, `course ${state} successfully`);
};

let deleteCourse = async (req, res) => {
  let courseId = req.params.courseId;
  let course = await findObjAndCheckExists(Course, courseId);

  await Course.deleteOne({ _id: courseId });

  return handleResponse(res, 200, SUCCESS, "course deleted successfully");
};

module.exports = {
  getAllCourses,
  getSingleCourseById,
  updateCourseOfInstructor,
  deleteCourse,
};

let checkValidState = (state) => {
  let states = ["Waiting", "Accepted", "Rejected"];
  if (!states.includes(state)) throw generateError(404, FAIL, "Invalid state");
};

let checkQuery = (req) => {
  let query = req.query;
  let filter = {};
  if (query.id) {
    checkUserId(req.currentUser.id, query.id);
    findObjAndCheckExists(Instructor, query.id);
    filter.instructorId = query.id;
  }
  if (query.state) {
    console.log(query.state);
    checkValidState(query.state);
    filter.state = query.state;
  }

  return filter;
};
