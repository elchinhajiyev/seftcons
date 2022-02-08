var mongoose = require('mongoose');
const Evaluation = require('./models/evaluationModel');
const Comment = require('./models/commentModel');


var data = [
    {
        name:"AACCC",
        question_1:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_2:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_3:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_4:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_5:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_6:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_7:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_8:"",
        question_9:"",
        question_10:"",
        question_11:"",
        question_12:"",
        question_13:"",
        question_14:"",
        question_15:"",
        question_16:"",
        question_17:"",
    },
    {
        name:"BCTTT",
        question_1:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_2:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_3:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_4:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_5:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_6:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_7:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_8:"",
        question_9:"",
        question_10:"",
        question_11:"",
        question_12:"",
        question_13:"",
        question_14:"",
        question_15:"",
        question_16:"",
        question_17:"",
    },
    {
        name:"GGGG",
        question_1:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_2:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_3:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_4:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_5:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_6:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_7:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        question_8:"",
        question_9:"",
        question_10:"",
        question_11:"",
        question_12:"",
        question_13:"",
        question_14:"",
        question_15:"",
        question_16:"",
        question_17:"",
    },
];


function cerezData(){
    //remove data
    Evaluation.remove({}, function(err){
        if(err){
            console.log(err);
        }
            console.log('Evaluations removed');
        //add data
        data.forEach(function(degisken){
            Evaluation.create(degisken, function(err, evaluation){
                if(err){
                    console.log(err);
                }else{
                    console.log("New evaluation added");

                    Comment.create({
                       content:'Bu bir test komentidir.',
                       author: 'Emil Asgarov' 
                    },
                    function(err, comment){
                        if(err){
                            console.log(err);
                        }else{
                            evaluation.comments.push(comment);
                            evaluation.save();
                            console.log('new comment added')
                        }
                    });
                }
            });
        })
    });
}

module.exports= cerezData;