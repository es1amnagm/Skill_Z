const asyncWrapper = require("../../Middleware/asyncWrapper");
const checkUserId = require("../../Utils/checkUserId");
const Course = require("../../Models/courseModel");
const studentCourses = require("../../Models/studentCoursesModel");
const Student = require("../../Models/userModel");
const User = require("../../Models/userModel");

const handleResponse = require("../../Middleware/handleResponse");
const { findObjAndCheckExists } = require("../../Utils/findObjAndCheckExists");
const { SUCCESS, FAIL } = require("../../Utils/responseStatus");
const generateError = require("../../Utils/generateError");

const enrollCourse = asyncWrapper(async (req, res, next) => {
  // let JWTStudentId = req.currentUser.id;
  let { studentId, courseId } = req.body;
 
  console.log(req.body);
  // let studentId = "69fdd92b68d7b2d444db23da";
  // let courseId = "69fd03de3d4a9fb2a487e293"
  
  
  // checkUserId(JWTStudentId, studentId);
  let course = await findObjAndCheckExists(Course, courseId);
  let student = await findObjAndCheckExists(Student, studentId);
  let studentCourse = await checkEnrolled(studentCourses, studentId, courseId);
  let currentBalance = await checkBalance(req, price, student.balance);

    if (studentCourse)
      throw generateError(400, FAIL, "this course already enrolled");

  let enrollCourse = new studentCourses({
    studentId,
    courseId,
  });

  await enrollCourse.save();

  await Student.updateOne(
    { _id: studentId },
    { $set: { balance: currentBalance } },
  );

  return handleResponse(res, 201, SUCCESS, "course enrolled successfully");
});

let unEnrollCourse = asyncWrapper(async (req, res, next) => {
  // let JWTStudentId = req.currentUser.id;
  let { studentId, courseId } = req.body;

  // checkUserId(JWTStudentId, studentId);

  let studentCourse = await checkEnrolled(studentCourses, studentId, courseId);
  if (!studentCourse) {
    throw generateError(400, FAIL, "this course already unenrolled");
  }

  await studentCourses.deleteOne({ $and: [{ studentId, courseId }] });

  return handleResponse(res, 200, SUCCESS, "course unenrolled successfully");
});

let getStudentData = asyncWrapper(async (req, res, next) => {
  let studentId = req.params.studentId;
  // let JWTStudentId = req.currentUser.id;
  // checkUserId(JWTStudentId,studentId);
  let StudentData = await findObjAndCheckExists(User, studentId);

  let StudentCourses = await studentCourses.find({ studentId });
  if (StudentCourses.length == 0) StudentCourses = "no courses yet";

  let studentData = { StudentData, StudentCourses };

  return handleResponse(res, 200, SUCCESS, studentData);
});

module.exports = {  unEnrollCourse, getStudentData };

let checkEnrolled = async (studentCourses, studentId, courseId) => {
  let studentCourse = await studentCourses.findOne({
    $and: [{ studentId }, { courseId }],
  });

  return studentCourse;
};



