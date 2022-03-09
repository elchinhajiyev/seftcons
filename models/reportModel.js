const mongoose = require ('mongoose')


var reportSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" 
        },
        username: String,
        fullname: String
    },
 
    content_1:{
        type:String,
      
    },
 
    content_2:{
        type:String,
      
       
    },
    content_3:{
        type:String,
     
       
    },
    content_4: {
        type:String,
       
    },
    
    content_5: {
        type:String,
        
    },
    
    content_6: {
        type:String,
        
    },
    
    content_7: {
        type:String,
        
    
    },
    
    content_8: {
        type:String,
        
    },
    
    content_9: {
        type:String,
        
    },
    
    content_10: {
        type:String,
        
    },
    
    content_11: {
        type:String,
       
    },
    
    content_12: {
        type:String,
      
    },
    
    content_13: {
        type:String,
       
    },
    
    content_14: {
        type:String,
       
    },
    
    content_15: {
        type:String,
       
    },
    
    content_16: {
        type:String,
     
    },
    
    content_17: {
        type:String,
     
    },
    
    content_18: {
        type:String,
  
    },
    content_19: {
        type:String,
        
    },
    content_20: {
        type:String,
        
    },
    content_21: {
        type:String,
      
    },
    content_22: {
        type:String,
        
    },
 
    content_23: {
        type:String,
        
    },
 
    content_24: {
        type:String,
      
    },
 
    content_25: {
        type:String,
       
    },
 

 
  
 },{timestamps:true});

 
module.exports = mongoose.model('Report', reportSchema);

