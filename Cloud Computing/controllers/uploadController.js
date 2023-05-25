'use strict';

// cloud storage firebase
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require('firebase/storage');

const storage = getStorage();

const uploadFile = async (req, res) => {
  try {
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(
      storage,
      `files/${req.file.originalname + '       (' + dateTime + ')'}`
    );

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('File successfully uploaded.');
    return res.send({
      message: 'file uploaded to firebase storage',
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL: downloadURL,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = time + ' and ' + date;
  return dateTime;
};

module.exports = {
  uploadFile,
};
