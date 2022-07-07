const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
var path = require("path");

const s3Config = new aws.S3({
  accessKeyId: process.env.IAM_AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
  secretAccessKey: process.env.IMA_AWS_SECRET_TOKEN,
});

// const upload = multer({
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   storage: multerS3({
//     s3: s3Config,
//     bucket: process.env.AWS_S3_BUCKET_NAME,
//     acl: "public-read",
//     metadata: function (req, file, cb) {
//       cb(null, {
//         fieldName: file.fieldname,
//       });
//     },
//     key: function (req, file, cb) {
//       cb(null, new Date().toString() + "-" + file.originalname);
//     },
//   }),
//   fileFilter: function (req, file, callback) {
//     var ext = path.extname(file.originalname);
//     if (ext !== ".txt") {

//       return callback(new Error("Only PDF files are allowed"));
//     }
//     callback(null, true);
//   },
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../files/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage });

module.exports = upload;
