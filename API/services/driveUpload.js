
const stream = require('stream');
const fs= require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const send_formatted_response_handler = require("../helper/HTTP_response_handler");


const keyfilePath= './API/services/credentials.json';

const auth = new google.auth.GoogleAuth({
    keyFile: keyfilePath,
    scopes:[process.env.GOOGLE_DRIVE_SCOPES]
});

const uploadFile= (req, res, next)=> {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.files[0].buffer);
    const drive = google.drive({
        version: 'v3',
        auth
    });
    const fileMetadata = {
        'name': req.files[0].originalname,
        'parents': [process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID],
        'mimeType': req.files[0].mimetype,
    };
    const media = {
        mimeType: req.files[0].mimetype,
        body: bufferStream,
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
    }).then((result)=> {
        req.body.url= `https://drive.google.com/open?id=${result.data.id}`;
        // console.log(result.data.id);
        return next();
    }
    ).catch((err)=> {
        console.log(err);
        return res.status(500).json(send_formatted_response_handler(err, false, "Something went wrong"));
    }
    );
}

module.exports = uploadFile;