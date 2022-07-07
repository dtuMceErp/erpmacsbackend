const send_formatted_response_handler = require("../../helper/HTTP_response_handler");

exports.experience_validator = (req, res, next) => {
  if (!req.body.isOngoing) {
    if (req.body.startDate == null || req.body.endDate == null) {
      return res
        .status(409)
        .json(
          send_formatted_response_handler(
            {},
            false,
            "Start Date and End Date can't be empty"
          )
        );
    }
  }
  if (req.body.isOngoing && req.body.startDate == null) {
    return res
      .status(409)
      .json(
        send_formatted_response_handler({}, false, "Start Date can't be empty")
      );
  }
  var startDate = new Date(req.body.startDate);
  var endDate = new Date(req.body.endDate);
  var todayDate = new Date();
  if (startDate > todayDate || endDate > todayDate) {
    return res
      .status(409)
      .json(
        send_formatted_response_handler(
          {},
          false,
          "Start Date and End Date should be less than current date"
        )
      );
  }
  if (startDate > endDate && req.body.isOngoing == false) {
    return res
      .status(409)
      .json(
        send_formatted_response_handler(
          {},
          false,
          "Start Date should be less than End Date"
        )
      );
  }
  next();
};
