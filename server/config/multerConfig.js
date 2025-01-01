const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig')

const profileImageStorage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'QuizzApplication/ProfileImages',
        allowed_formats:['jpg','jpeg','png','svg'],
    },
})

const quizzQuestionStorage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"QuizzApplication/QuizzQuestionImages",
        allowed_formats:['jpg','jpeg','png','svg'],
    }
});

const profileImageUploader = multer({storage:profileImageStorage});
const quizzQuestionImageUploader = multer({storage:quizzQuestionStorage});

module.exports = {
    profileImageUploader,
    quizzQuestionImageUploader,
}