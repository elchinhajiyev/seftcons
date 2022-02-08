const mongoose = require ('mongoose')


var commentSchema = new mongoose.Schema({
    author: {
        type: String,
        require:true
    },
 
    content:{
        type: String,
        require: true
    },
 
  
 },{timestamps:true});


module.exports = mongoose.model('Comment', commentSchema);

