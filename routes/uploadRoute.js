const uploadRoute = require('express').Router()
const uploadProfilePics = require('../controlers/uploads');
const upload = require('../middleware/uploadMiddleware');
const {isAuthenticate} = require('../middleware/authMiddleware');

uploadRoute.post('/profilepics', isAuthenticate, upload.single('profilepics'), uploadProfilePics)


module.exports = uploadRoute