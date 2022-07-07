const send_formatted_response_handler = require("../../helper/HTTP_response_handler");

exports.research_validator = (req, res, next) => {
  if (!req.body.isOngoing && req.body.publicationDate == null) {
    return res
      .status(409)
      .json(
        send_formatted_response_handler(
          {},
          false,
          "Publication Date can't be empty"
        )
      );
  }
  var publicationDate = new Date(req.body.publicationDate);
  var todayDate = new Date();
  if (publicationDate > todayDate) {
    return res
      .status(409)
      .json(
        send_formatted_response_handler(
          {},
          false,
          "Publication Date should be less than current date"
        )
      );
  }
  next();
};
