const send_formatted_reponse_handler = require("./HTTP_response_handler");

module.exports = (req, res, next) => {
  if (req.userData.isVerifiedByAdmin == false) {
    return res
      .status(403)
      .json(
        send_formatted_reponse_handler(
          req.userData,
          false,
          "You are not verified by admin"
        )
      );
  }
  next();
};
