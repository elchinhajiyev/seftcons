const express = require('express')
const router = express.Router()
const Blog = require ('../models/blogs')
const Evaluation = require ('../models/evaluations')

router.get('/evaluation', (req,res)=>{
    Evaluation.find().sort({created_At:-1})
    .then((result)=>{
     res.render('evaluation',  {title: 'Form' , evaluations: result}) 
    })
    .catch((err)=>{
     console.log(err)
 })
 })
//----------------------------
//blog Parametrelere yonlendirme

//----institution parametrelere yonlendirme

router.get('/evaluation/:id', (req,res)=>{
    const id= req.params.id
    Evaluation.findById(id)
    .then((result)=>{
        res.render('institution', {institution: result, title: "detay"})

    })
    .catch((err)=>{
        res.status(404).render('404',  {title: 'Error 404'})
    })
  
})

module.exports(router)