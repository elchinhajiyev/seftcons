const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const methodOverride = require('method-override'),
LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');
const Evaluation = require('./models/evaluationModel');
const Comment = require('./models/commentModel');
const User =  require('./models/userModel');
const cerezData = require('./cerez');
const { find, db } = require('./models/evaluationModel');
const res = require('express/lib/response');
const { isBuffer } = require('lodash');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 27777;

const dbURL = 'mongodb+srv://dbuser:m0LNAxSPU0pMgSmu@akkreditasiya.n1bzf.mongodb.net/evaluations?retryWrites=true&w=majority'
mongoose.connect(dbURL)
    .then((result) => app.listen(PORT, () => {
        console.log(`Server ${PORT} portunda calisir`);
    }));
/* 
cerezData();
 */
//passport config
app.use(require('express-session')({
    secret: 'this is secret',
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//butun routlara accessd

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});


//=========Auth ROUTES=========//
//signup
app.get('/signup', function(req,res){
    res.render('signup');
});

app.post('/signup', function(req,res){
    let newUser = new User({username:req.body.username, fullname: req.body.fullname, phone: req.body.phone});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render('signup')
        }
         passport.authenticate('local')(req,res, function(){
            res.redirect('evaluations') 
         })  
    })
});

//login
app.get('/login', function(req,res){
    res.render('login');
});

app.post('/login', passport.authenticate("local",{
successRedirect: "/evaluations",
failureRedirect: "/login",
}), function (req,res){
});

//signout
app.get("/signout", function(req,res){
    req.logout();
    res.redirect("/login")
});

function userIsLogin(req, res, next){
    if(
        req.isAuthenticated()){
            return next();
        }
        res.redirect('/login'); 
};

app.get('/user/:id/profile', userIsLogin, function(req,res){
res.render("userProfile");
});

//============AUTH ROUTES=================//

app.get('/',  function (req, res) {
    console.log(req.user)
    res.render('login');
});

//====================EVALUATION ROUTES==================//


app.get('/evaluations', userIsLogin, function (req, res) {
    Evaluation.find({}, function (err, evaluationDB) {
        if (err) {
            console.log(err)
        } else {
            res.render("evaluations/evaluations", { evaluations: evaluationDB });
        }
    });
});
app.get('/evaluations/add', userIsLogin, function (req, res) {
    res.render("evaluations/add") 
});

app.post('/evaluations', (req,res)=>{
  var name = req.body.name;
  var question_1 = req.body.question_1;
  var question_2 = req.body.question_2;
  var question_3 = req.body.question_3;
  var question_4 = req.body.question_4;
  var question_5 = req.body.question_5;
  var question_6 = req.body.question_6;
  var question_7 = req.body.question_7;
  var question_8 = req.body.question_8;
  var question_9 = req.body.question_9;
  var question_10 = req.body.question_10;
  var question_11 = req.body.question_11;
  var question_12 = req.body.question_12;
  var question_13 = req.body.question_13;
  var question_14 = req.body.question_14;
  var question_15 = req.body.question_15;
  var question_16 = req.body.question_16;
  var question_17 = req.body.question_17;
  var author = {id: req.user._id, username: req.user.username, username: req.user.fullname};
  var newevaluation = {
      name: name, 
      question_1:question_1, 
      question_2:question_2,
      question_3:question_3,
      question_4:question_4,
      question_5:question_5,
      question_6:question_6,
      question_7:question_7,
      question_8:question_8,
      question_9:question_9,
      question_10:question_10,
      question_11:question_11,
      question_12:question_12,
      question_13:question_13,
      question_14:question_14,
      question_15:question_15,
      question_16:question_16,
      question_17:question_17,
      author: author,
    }
    Evaluation.create(newevaluation, function(err, createdEvaluation){
        if(err){
            console.log(err);
        }else{
            res.redirect('/evaluations')
        }
        
    })
});

app.get('/evaluations/:id', function(req,res){
    Evaluation.findById(req.params.id).populate("comments").exec(function(err, findevaluation){
        if(err){
            console.log(err);
        }else{
            res.render('evaluations/evaluation', {evaluation: findevaluation});
        }
    });

});


//====================EVALUATION ROUTES==================//



//====================EVALUATION EDIT ROUTES==================//

app.get('/evaluations/:id/edit', userIsLogin, function(req,res){
Evaluation.findById(req.params.id, function(err, findevaluation){
    if(err){
        console.log(err);
    }else{
        res.render('evaluations/edit', {evaluation: findevaluation});
    }
})
});

app.put('/evaluations/:id', userIsLogin, function (req,res) {
Evaluation.findByIdAndUpdate(req.params.id, req.body.evaluation, function(err, updatedevaluation){
    if (err) {
        console.log(err)
    }else{
        res.redirect('/evaluations/'+req.params.id);
    }
})
})

//====================EVALUATION EDIT ROUTES==================//


//==============================COMMENT ROUTES==========================//

app.get('/evaluations/:id/comments/add', function(req,res){
    Evaluation.findById(req.params.id, function(err, findevaluation){
       if(err){
           console.log(err);
       } else{
           res.render('comments/add', {evaluation : findevaluation });
       }
    });
});


app.post('/evaluations/:id/comments/', userIsLogin, function(req,res){
    Evaluation.findById(req.params.id, function(err, findevaluation){
       if(err){
           console.log(err);
       } else{
           Comment.create(req.body.comment, function(err, comment ){
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.author.fullname = req.user.fullname;
               comment.save();
               findevaluation.comments.push(comment)
               findevaluation.save();
               res.redirect("/evaluations/"+findevaluation._id)

           })
       }
    });
});

//==============================COMMENT ROUTES==========================//












/* app.post('/evaluations', (req,res)=>{
    const evaluation = new Evaluation(req.body)
    evaluation.save()
    .then((result)=>{
        res.redirect('/evaluations')
    })
    .catch((err)=>{
        console.log(err);
    })
}); */