const mongoose = require('mongoose');
const JOI = require('joi');

const messageSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    messages:[{
         questions:{
            type:String,
         },
         reply:{
            type:String,
         },
         createdAt:{
            type:Date,
            default:Date.now,
         }
    }]
});

const Message = mongoose.model('Message',messageSchema);
