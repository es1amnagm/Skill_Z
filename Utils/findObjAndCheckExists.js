const generateError = require("./generateError");
const { FAIL } = require("./responseStatus");

let findObj = async (Object, objId) => {
  let object = await Object.findOne({ _id: objId }, { __v: 0, password: 0 });

  return object;
};

let checkObjExist = (obj) => {
  if (!obj) throw generateError(404, FAIL, `no data for this ID`);
  return obj;
};

let findObjAndCheckExists = async (Object, objId) => {
  let obj = await findObj(Object, objId);

  checkObjExist(obj);
  return obj;
};

module.exports = {
  findObjAndCheckExists,
  findObj,
  checkObjExist,
};
