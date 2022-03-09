const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const methodOverride = require('method-override');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const options = {format:'A4'};
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
const Evaluation = require('./models/evaluationModel');
const Comment = require('./models/commentModel');
const User =  require('./models/userModel');
const Report =  require('./models/reportModel');
const cerezData = require('./cerez');
const { find, db } = require('./models/evaluationModel');
const res = require('express/lib/response');
const { isBuffer, result } = require('lodash');
const app = express();
const {authPages , ROLE, authPagesTeamLeader, authAdmin} = require('./middlewares')
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(__dirname+'/public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 27777;

const dbURL = 'mongodb+srv://dbuser:m0LNAxSPU0pMgSmu@akkreditasiya.n1bzf.mongodb.net/evaluations?retryWrites=true&w=majority'
mongoose.connect(dbURL)
    .then((result) => app.listen(PORT, () => {
        console.log(`Server ${PORT} portunda calisir`);
    }));

/* cerezData(); */

//todo upload storage

var storage = multer.diskStorage({
    destination: 'public/upload/',
    filename: function (req,file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if(err) return cb(err)
            cb(null, Math.floor(Math.random()*900000000)+1000000000+path.extname(file.originalname))
            
        })
        
    }
})
var upload = multer({storage:storage});

//roles



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
    res.render('/');
});

app.post('/signup', function(req,res){
    let newUser = new User({username:req.body.username, fullname: req.body.fullname, phone: req.body.phone, role: req.body.role, evaluationid: req.body.evaluationid});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render('login')
        }
         passport.authenticate('local')(req,res, function(){
            res.redirect('/') 
         })  
    })
});

//login
app.get('/login', function(req,res){
    res.render('login');
});



app.post('/login', passport.authenticate("local",{
successRedirect: "/home",
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

function userControl(req, res, next) {
    if(req.isAuthenticated()){
        Evaluation.findById(req.params.id, function (err, findevaluation){
            if (err) {
                console.log(err);
            }else{
                if (findevaluation.author.id.equals(req.user._id)) {
                    next();
                    
                }else{
                   res.send ('Başqasının məlumatlarını dəyişdirmə icazəniz yoxdur')
                }
            }
        });
    }
}

app.get('/user/:id/profile', userIsLogin, function(req,res){
res.render("userProfile");
});

//============AUTH ROUTES=================//

app.get('/', userIsLogin,  function (req, res) {
    res.render('home');
});

app.get('/home', userIsLogin, function (req, res) {
    res.render('home');
});


app.get('/thanks', function(req,res){
    res.render('thanks');
});
//====================EVALUATION ROUTES==================//




/* app.get('/evaluations', userIsLogin, function(req,res){
    Evaluation.find(function(err, findevaluation){
        var currentUser=req.user
       if(currentUser.evaluationid===findevaluation._id){
        res.render('evaluations/evaluations', {evaluation : findevaluation })
       } 
    });
});
 */


app.get('/evaluations',  userIsLogin,  (req, res)=> {
    Evaluation.find().sort({createdAt:-1})
       .then((result)=>{
        res.render("evaluations/evaluations", { evaluations: result });
       })
       .catch((err)=>{
           console.log(err);
       })
});


app.get('/evaluations/add', userIsLogin,  function (req, res) {
    res.render("evaluations/add") 
});

app.post('/evaluations', userIsLogin, (req,res)=>{
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
  var question_18 = req.body.question_18;
  var author = {id: req.user._id, username: req.user.username, fullname: req.user.fullname, role: req.user.role, evaluationid: req.user.evaluationid,  field: req.user.field };
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
      question_18:question_18,
      author: author,
    }
    Evaluation.create(newevaluation, function(err, createdEvaluation){
        var currentUser=req.user
        if(err){
            console.log(err);
            res.redirect('/')
        }else{
            currentUser.evaluations.push(createdEvaluation)
            currentUser.save();
            res.redirect('/thanks')
        }
        
    })
});

app.get('/evaluations/:id', userIsLogin, function(req,res){
    Evaluation.findById(req.params.id).populate("comments").exec(function(err, findevaluation){
        if(err){
            console.log(err);
        }else{
            res.render('evaluations/evaluation', {evaluation: findevaluation});
        }
    });

});

 app.get('/evaluations/:id/result', userIsLogin, function(req,res){
    Evaluation.findById(req.params.id).populate("comments").exec(function(err, findevaluation){
        if(err){
            console.log(err);
        }else{
            res.render('evaluations/result', {evaluation: findevaluation});
        }
    });

}); 





app.get('/evaluations/:id/comments', userIsLogin, function(req,res){
    Evaluation.findById(req.params.id).populate("comments").sort({createdAt:-1}).exec(function(err, findevaluation){
        if(err){
            console.log(err);
        }else{
            res.render('evaluations/comments', {evaluation: findevaluation});
        }
    });

});


//====================EVALUATION ROUTES==================//




//====================Report ROUTES==================//


app.get('/evaluations/:id/reports/add', userIsLogin,  function(req,res){
    Evaluation.findById(req.params.id, function(err, findevaluation){
       if(err){
           console.log(err);
       } else{
           res.render('reports/add', {evaluation : findevaluation });
       }
    });
});


app.post('/evaluations/:id/reports', userIsLogin, function(req,res){
    Evaluation.findById(req.params.id, function(err, findevaluation){
       if(err){
           console.log(err);
       } else{
           Report.create(req.body.report, function(err, report ){
               report.author.id = req.user._id;
               report.author.username = req.user.username;
               report.author.fullname = req.user.fullname;
               report.save();
               findevaluation.reports.push(report)
               findevaluation.save();
               res.redirect("/thanks")
               /* res.redirect("/evaluations/"+findevaluation._id) */
               

           })
       }
    });
});

app.get('/evaluations/:id/reports', userIsLogin, function(req,res){
    Evaluation.findById(req.params.id).populate("reports").exec(function(err, findevaluation){
        if(err){
            console.log(err);
        }else{
            res.render('evaluations/reports', {evaluation: findevaluation});
        }
    });

});




//====================Report ROUTES==================//



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

app.put('/evaluations/:id', userControl, userIsLogin, function (req,res) {
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

app.get('/evaluations/:id/comments/add', userIsLogin, function(req,res){
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



//==============================UPLOAD ROUTES==========================//

app.post('/upload', multipartMiddleware, (req,res)=>{
    try {
        fs.readFile(req.files.upload.path, function (err, data) {
            var newPath = __dirname + '/public/images/' + req.files.upload.name;
            fs.writeFile(newPath, data, function (err) {
                if (err) console.log({err: err});
                else {
                    console.log(req.files.upload.originalFilename);
                //     imgl = '/images/req.files.upload.originalFilename';
                //     let img = "<script>window.parent.CKEDITOR.tools.callFunction('','"+imgl+"','ok');</script>";
                //    res.status(201).send(img);
                 
                    let fileName = req.files.upload.name;
                    let url = '/images/'+fileName;                    
                    let msg = 'Yukleme tamamlandi';
                    let funcNum = req.query.CKEditorFuncNum;
                    console.log({url,msg,funcNum});
                   
                    res.status(201).send("<script>window.parent.CKEDITOR.tools.callFunction('"+funcNum+"','"+url+"','"+msg+"');</script>");
                }
            });
        });
       } catch (error) {
           console.log(error.message);
       }
})

//==============================UPLOAD ROUTES==========================//

//==============================USER ROUTES==========================//

app.get('/users', userIsLogin, authPages(ROLE.ADMIN),(req, res)=> {
    User.find().sort({field:-1})
       .then((result)=>{
        res.render("users", { users: result });
       })
       .catch((err)=>{
           console.log(err);
       })
});

app.get('/notaccess', userIsLogin, (req,res)=>{
    res.render('notaccess')
});

app.get('/users/:id/edit', userIsLogin, authPages(ROLE.ADMIN), function(req,res){
    User.findById(req.params.id, function(err, finduser){
        if(err){
            console.log(err);
        }else{
            res.render('evaluations/useredit', {user: finduser});   
        }
    });
    })
    


app.put('/users/:id', userIsLogin, authPages(ROLE.ADMIN), function (req,res) {
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updateduser){
        if (err) {
            console.log(err)
        }else{
                res.redirect('/users') 
      
        }
        })
        })
        

    

//==============================USER ROUTES END==========================//

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