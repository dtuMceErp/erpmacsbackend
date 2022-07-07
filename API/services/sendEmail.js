const sgMail = require("@sendgrid/mail");
const crypto = require("../helper/crypto");
const send_formatted_response_handler = require("../helper/HTTP_response_handler");

exports.sendConfirmationEmail = async (user) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const token = crypto.encryptWithAES(String(user._id));
    // console.log("1" + token);
    const newToken = token.split("/").join(process.env.SPECIAL_SYMBOL);
    // console.log("2" + newToken);
    const url = `http://localhost:3000/confirmation/${newToken}`;
    const msg = {
      to: `${user.email}`,
      from: "sjsamyak2001@gmail.com",
      subject: "Confirmation Email",
      html: `<h2>You're on your way! Let's confirm your email address.</h2> <p>By clicking on the following link, you are confirming your email address</p> <a href="${url}">${url}</a>`,
    };
    await sgMail.send(msg);
  } catch (err) {
    console.log(err);
  }
};
