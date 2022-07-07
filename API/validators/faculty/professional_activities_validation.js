const send_formatted_response_handler = require("../../helper/HTTP_response_handler");

exports.professional_activities_validator = (req, res, next) => {
  var today = new Date();
  var date = new Date(req.body.date);
  if (date > today) {
    return res
      .status(409)
      .json(
        send_formatted_response_handler(
          {},
          false,
          "Date should be less than current date"
        )
      );
  }
  next();
};
