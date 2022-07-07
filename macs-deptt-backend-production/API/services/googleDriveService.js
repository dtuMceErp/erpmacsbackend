// const send_formatted_response_handler = require("../helper/HTTP_response_handler");
// const fs = require('fs');
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { google } = require('googleapis');

// /**
//  * Browse the link below to see the complete object returned for folder/file creation and search
//  *
//  * @link https://developers.google.com/drive/api/v3/reference/files#resource
//  */

// const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
// const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
// const redirectUrl = process.env.GOOGLE_DRIVE_REDIRECT_URL;
// const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

// const oauth2Client = new google.auth.OAuth2(
//     clientId,
//     clientSecret,
//     redirectUrl
// );

// oauth2Client.setCredentials({
//     refresh_token: refreshToken,
// });

// const drive = google.drive({
//     version: 'v3',
//     auth: oauth2Client,
// });


// const uploadFile= (req, res, next)=> {
//     drive.files.create({
//         requestBody: {
//             name: req.file.originalname,
//             mimeType: req.file.mimetype,
//         },
//         media: {
//             mimeType: req.file.mimetype,
//             body: fs.createReadStream(req.file.path),
//         }
//     }).then((result)=> {
        
//         res.file.path= result.data.webContentLink;
//         console.log(res.file.path);
//         return next();
//     }).catch((err)=> {
//         return res.status(500).json(send_formatted_response_handler(err, false, "Something went wrong"));
//     }
//     );
// }

// module.exports = uploadFile;
