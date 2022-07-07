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
    const drive = google.drive({
        version: 'v3',
        auth
    });
    const fileMetadata = {
        'name': req.file.originalname,
        'parents': [process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID],
        'mimeType': req.file.mimetype,
    };
    const media = {
        mimeType: req.file.mimetype,
        body: fs.createReadStream(req.file.path),
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'webContentLink',
    }).then((result)=> {
        console.log(result);
        return next();
    }
    ).catch((err)=> {
        console.log(err);
        return res.status(500).json(send_formatted_response_handler(err, false, "Something went wrong"));
    }
    );
}

module.exports = uploadFile;