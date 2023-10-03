const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const uploads = async (data) => {

    let fileUrl = '';

    const fileBuffer = Buffer.from(data, 'base64');
    const filename = data.split('/').pop();

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${Date.now()}`,
        Body: fileBuffer
    };

    const s3Response = await s3.upload(params).promise();
    fileUrl = s3Response.Location;
    return fileUrl;
}

module.exports = uploads;



// const AWS = require('aws-sdk');

// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_ID,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//     region: process.env.AWS_REGION,
// });

// const s3 = new AWS.S3();

// const uploads = async (file) => {

//     let fileUrl = '';

//     const fileBuffer = file.data; // The file data from FormData
//     const mimeType = file.type; // The MIME type of the file
//     const fileExtension = mimeType.split('/')[1];
//     const filename = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExtension}`;

//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `uploads/${filename}`,
//         Body: fileBuffer
//     };

//     const s3Response = await s3.upload(params).promise();
//     fileUrl = s3Response.Location;
//     return fileUrl;
// }

// module.exports = uploads;
