const mongoose = require("mongoose");
const crypto = require("../helper/crypto");
const send_formatted_response_handler = require("../helper/HTTP_response_handler");
const User = require("../models/user");

exports.email_confirmation = (req, res, next) => {
  const encryptedID = String(req.params.id);
  newEncryptedID = encryptedID.split(process.env.SPECIAL_SYMBOL).join("/");
  const id = crypto.decryptWithAES(newEncryptedID);
  User.findOneAndUpdate({ _id: id }, { $set: { isEmailVerified: true } })
    .exec()
    .then((result) => {
      res
        .status(200)
        .json(
          send_formatted_response_handler(
            result,
            true,
            "Email verified successfully"
          )
        );
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          send_formatted_response_handler(err, false, "Something went wrong")
        );
    });
};
