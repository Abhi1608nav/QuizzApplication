const mongoose = require('mongoose');
const JOI = require('joi');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    profileImg:{
        type:String,
    },
    profileImageId:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    quizTaken:[
         {
            quizID:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'quizzes'
            },
            marks:[Number],
            correctAnswer:[Boolean],
            examAttend:{
                type:Date
            }
         }
    ]
});

const userValidation = (data)=>{
    const schema = JOI.object({
        username:JOI.string().required(),
        email:JOI.string().email({minDomainSegments:2,tlds:{allow:['com','net','outlook']}}).required(),
        password:JOI.string().min(8).max(50).required(),

    })
    return schema.validate(data);

}

const User = mongoose.model('User',userSchema);

module.exports = {
    User,
    userValidation
};

