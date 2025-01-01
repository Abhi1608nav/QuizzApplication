const express = require('express');
const { signUp, login, logout, updateProfile } = require('../controllers/userController');
const userAuthMiddleware = require('../middleware/userAuth');
const { profileImageUploader } = require('../config/multerConfig');
const router = express.Router();


router.post('/signup',signUp);
router.post('/login',login);
router.post('/logout',logout);
router.post('/update-profile',userAuthMiddleware,profileImageUploader.single('profileImage'),updateProfile);

module.exports = router;