const mongoose = require ('mongoose')

var evaluationSchema2 = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
 
    question_1:{
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
       
    },
 
    question_2: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
 
    question_3: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
     },
 
    question_4: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
    question_5: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
    question_6: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
    question_7: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
    question_8: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
    question_9: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
    question_10: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
    question_11: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
    question_12: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
    question_13: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
    question_14: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
    question_15: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
    question_16: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
    question_17: {
        content: String, require: true,
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    
   

    },{timestamps:true});


    module.exports = mongoose.model('Evaluation', evaluationSchema2);

