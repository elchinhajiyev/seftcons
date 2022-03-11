var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    passport: String,
    fullname: String,
    phone: String,
    role: String,
    news:[{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Evaluation" 
        },
        header: {
            type: String,
            require:true,
        },
    
        short:{
            type:String,
            require: true
        },
     
        long:{
            type:String,
            require: true
        },
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    
    }]
},{timestamps:true});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model ('User' , userSchema);
