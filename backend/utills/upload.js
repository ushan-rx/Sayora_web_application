const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/'); 
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more MIME types if needed
        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            console.log('Only JPEG, PNG, and GIF files are supported');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5 // 2MB file size limit (adjust as needed)
    }
});

module.exports = upload;