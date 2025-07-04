const mongoose = require("mongoose")

const Userschema = new mongoose.Schema({    
    FirebaseUId : {
        type : String,
        required : true     
    } ,
    UserName : {
        type : String,
        required : true 
    } ,
    
   ProfilePic : {
    type : String ,
    required : true 

    },
    Bio : {
        type : String 
    },
    Hobbies : {
        type : String 
    } ,
    DOB : {
        type : Date
    } ,
    Gender : {
        type : String
    } ,
    Timestamp : {
        type : Date,
        default : new Date()
    }
  
} 
)

module.exports = mongoose.model('user' , Userschema)