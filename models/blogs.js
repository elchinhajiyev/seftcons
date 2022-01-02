const mongoose = require ('mongoose')
const bSchema = mongoose.Schema

const blogSchema = new bSchema({
   title: {
       type: String,
       require:true
   },

   short:{
       type: String,
       require: true
   },

   long: {
       type:String,
       require: true
   },

}, {timestamps:true}) 

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog