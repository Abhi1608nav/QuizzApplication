const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbconnect = () => mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('DataBase connected Successfully');
}).catch((e)=>{
    console.log(e.message);
})

module.exports =  dbconnect;