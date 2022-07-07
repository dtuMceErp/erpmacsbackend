const mongoose = require("mongoose");

const Documents = require("../../models/admin/notice");
const send_formatted_response_handler = require("../../helper/HTTP_response_handler");
const { uploadFile } = require("../../services/googleDriveService");

exports.get_all = (req, res, next) => {
  Documents.find()
    .select("title description url tags category").sort({createdAt:-1})
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        documents: docs.map((doc) => {
          return {
            _id: doc._id,
            title: doc.title,
            description: doc.description,
            url: doc.url,
            tags: doc.tags,
            category: doc.category,
          };
        }),
      };
      res.status(200).json(send_formatted_response_handler(response, true));
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          send_formatted_response_handler(err, false, "Something went wrong")
        );
    });
};

exports.create_new_notice = (req, res, next) => {
  const document = new Documents({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    url: req.file.path,
    important: req.body.important,
    tags: req.body.tags,
    category: req.body.category,
  });
  
  document
  .save()
  .then((result) => {
      res
        .status(201)
        .json(
          send_formatted_response_handler(
            result,
            true,
            "Document added successfully"
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
