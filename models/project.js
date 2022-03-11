const mongoose = require ('mongoose')

var projectSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true,
        
    },

    country:{
        type:String,
        require: true
    },
 
    client:{
        type:String,
        require: true,
    },
    funding:{
        type:String,
        require: true,
    },

    dates:{
        type:String,
        require: true,
    },
    
    partner:{
        type:String,
        require: true,
    },

    detail:{
        type:String,
        require: true,
    },

    },{timestamps:true});


    module.exports = mongoose.model('Project', projectSchema);

