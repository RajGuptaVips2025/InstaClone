// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '..', 'public', 'images', 'uploads'));
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     }
// });

// const upload = multer({ storage });

// module.exports = upload;


const multer = require('multer');
const path = require('path');

// Define allowed file types for images and videos
const allowedMimeTypes = [
  'image/jpeg', 
  'image/png', 
  'image/gif', 
  'video/mp4', 
  'video/mkv', 
  'video/avi', 
  'video/mov'
];

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'images', 'uploads')); // Updated to a more generic folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

// File filter function to validate file types
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only images and videos are allowed!'), false); // Reject the file
  }
};

// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB size limit
  fileFilter
});

const uploadMiddleware = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]);


module.exports = uploadMiddleware;
