const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"


const connectToMongo = ()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log('connected to database');
    })
}


module.exports = connectToMongo;