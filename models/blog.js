const mongoose = require ('mongoose')

var blogSchema = new mongoose.Schema({
    header: {
        type: String,
        require:true,
        
    },

    photo: {
        type: String,
        require:true,
        
    },

    short:{
        type:String,
        require: true
    },
 
    long:{
        type:String,
        require: true,
    },

    date:{
        type:String,
        require: true,
    },

    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" 
        },
        username: String,
        fullname: String,
        role: String,
    },

    },{timestamps:true});


    module.exports = mongoose.model('Blog', blogSchema);

