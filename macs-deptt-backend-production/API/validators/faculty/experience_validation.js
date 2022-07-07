const send_formatted_response_handler = require("../../helper/HTTP_response_handler");

exports.experience_validator = (req, res, next) => {
  if (!req.body.isOngoing) {
    if (req.body.dateOfJoining == null || req.body.dateOfLeaving == null) {
      return res
        .status(409)
        .json(
          send_formatted_response_handler(
            {},
            false,
            "Date of Joining and Date of Leaving can't be empty"
          )
        );
    }
  }
  if (req.body.isOngoing && req.body.dateOfJoining == null) {
    return res
      .status(409)
      .json(
        send_formatted_response_handler(
          {},
          false,
          "Date of Joining can't be empty"
        )
      );
  }
  var startDate = new Date(req.body.dateOfJoining);
  var endDate = new Date(req.body.dateOfLeaving);
  var todayDate = new Date();
  if (startDate > todayDate || endDate > todayDate) {
    return res
      .status(409)
      .json(
        send_formatted_response_handler(
          {},
          false,
          "Date of Joining and Date of Leaving should be less than current date"
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
          "Date of Joining should be less than Date of Leaving"
        )
      );
  }
  next();
};
