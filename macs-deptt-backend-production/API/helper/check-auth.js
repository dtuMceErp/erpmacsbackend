const jwt = require("jsonwebtoken");
const send_formatted_reponse_handler = require("./HTTP_response_handler");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.userData = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(
        send_formatted_reponse_handler(error, false, "Authorisation failed")
      );
  }
};
