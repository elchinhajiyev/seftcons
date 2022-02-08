const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');
const Evaluation = require('./models/evaluationModel');
const Comment = require('./models/commentModel');
const User =  require('./models/userModel');
const cerezData = require('./cerez');
const { find, db } = require('./models/evaluationModel');
const res = require('express/lib/response');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 27777;

const dbURL = 'mongodb+srv://dbuser:m0LNAxSPU0pMgSmu@akkreditasiya.n1bzf.mongodb.net/evaluations?retryWrites=true&w=majority'
mongoose.connect(dbURL)
    .then((result) => app.listen(PORT, () => {
        console.log(`Server ${PORT} portunda calisir`);
    }));

cerezData();

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


//butun routlara access

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
app.get('/evaluations/add', function (req, res) {
    res.render("evaluations/add") 
});

app.post('/evaluations', (req,res)=>{
    const evaluation = new Evaluation(req.body)
    evaluation.save()
    .then((result)=>{
        res.redirect('/evaluations')
    })
    .catch((err)=>{
        console.log(err);
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


app.post('/evaluations/:id/comments/', function(req,res){
    Evaluation.findById(req.params.id, function(err, findevaluation){
       if(err){
           console.log(err);
       } else{
           Comment.create(req.body.comment, function(err, comment ){
               findevaluation.comments.push(comment)
               findevaluation.save();
               res.redirect("/evaluations/"+findevaluation._id)

           })
       }
    });
});

//==============================COMMENT ROUTES==========================//


