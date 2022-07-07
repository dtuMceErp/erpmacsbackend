const send_formatted_response_handler = require("../../helper/HTTP_response_handler");

exports.certification_validator = (req, res, next) => {
  if (req.body.issueDate == null) {
    return res
      .status(409)
      .json(
        send_formatted_response_handler({}, false, "Issue Date can't be empty")
      );
  }
  var issueDate = new Date(req.body.issueDate);
  var todayDate = new Date();
  if (issueDate > todayDate) {
    return res
      .status(409)
      .json(
        send_formatted_response_handler(
          {},
          false,
          "Issue Date should be less than current date"
        )
      );
  }
  next();
};
