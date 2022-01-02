const mongoose = require ('mongoose')
const eSchema = mongoose.Schema

const evaluationSchema = new eSchema({
   name: {
       type: String,
       require:true
   },

   question_1:{
       type: String,
       require: true
   },

   question_2: {
       type:String,
       require: true
   },

   question_3: {
    type:String,
    require: true
},

question_4: {
    type:String,
    require: true
},

question_5: {
    type:String,
    require: true
},

question_6: {
    type:String,
    require: true
},

question_7: {
    type:String,

},

question_8: {
    type:String,
    
},

question_9: {
    type:String,
    
},

question_10: {
    type:String,
    
},

question_11: {
    type:String,
    require: true
},

question_12: {
    type:String,
    require: true
},

question_13: {
    type:String,
    require: true
},

question_14: {
    type:String,
    require: true
},

question_15: {
    type:String,
    require: true
},

question_16: {
    type:String,
    require: true
},

question_17: {
    type:String,
    require: true
},



}, {timestamps:true}) 

const Evaluation = mongoose.model('Evaluation', evaluationSchema)
module.exports = Evaluation