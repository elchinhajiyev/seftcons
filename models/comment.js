const mongoose = require ('mongoose')


var commentSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" 
        },
        username: String,
        fullname: String,
        role: String,
    },
 
    content:{
        type: String,
        require: true
    },
 
  
 },{timestamps:true});

 
module.exports = mongoose.model('Comment', commentSchema);

