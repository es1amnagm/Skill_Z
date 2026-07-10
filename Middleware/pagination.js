let pagination = (req) => {
  let limit = parseInt(req.query.limit) || 10;
  let page = parseInt(req.query.page) || 1;
  let skip = (page - 1) * limit;
  return { limit, skip };
};

module.exports = pagination;
