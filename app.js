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
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
const Blog = require('./models/blog');
const Comment = require('./models/comment');
const User =  require('./models/user');
const Project =  require('./models/project');
const res = require('express/lib/response');
const { isBuffer, result } = require('lodash');
const app = express();
const {authPages , ROLE,} = require('./middlewares')
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(__dirname+'/public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

const dbURL = 'mongodb+srv://seftdbuser:6PbIlWJrqIo0sPKN@cluster0.hzzlj.mongodb.net/sefdatabase?retryWrites=true&w=majority'
mongoose.connect(dbURL)
    .then((result) => app.listen(PORT, () => {
        console.log(`Server ${PORT} portunda calisir`);
    }));

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


//============AUTH ROUTES=================//

app.get('/',  function (req, res) {
    res.render('home');
});

//----------Blogs--------------------//
app.get('/blogs',  (req, res)=> {
    Blog.find().sort({createdAt:-1})
       .then((result)=>{
        res.render("blogs", { blogs: result });
       })
       .catch((err)=>{
           console.log(err);
       })
});

app.get('/blogadd', function (req, res) {
    res.render("blogadd") 
});


app.post('/blogs', (req,res)=>{
    var header = req.body.header;
    var photo = req.body.photo;
    var short = req.body.short;
    var long = req.body.long;
    var date = req.body.date;
    /* var author = {id: req.user._id, username: req.user.username, email: req.user.email, role: req.user.role}; */
    var newblog = {
        header: header, 
        photo: photo, 
        short:short,
        long:long,
        date:date,
     /*    author: author, */
      }
      Blog.create(newblog, function(err, createdBlog){
          var currentUser=req.user
          if(err){
              console.log(err);
              res.redirect('/')
          }else{
           
              res.redirect('/')
          }
          
      })
  });


  app.get('/blogs/:id', function(req,res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, findedblog){
        if(err){
            console.log(err);
        }else{
            res.render('blogs', {blogs: findedblog});
        }
    });

});

app.get('/blogs/:id/edit', userIsLogin, function(req,res){
    Blog.findById(req.params.id, function(err, findedblog){
        if(err){
            console.log(err);
        }else{
            res.render('blogedit', {blog: findedblog});
        }
    })
    });

    app.put('/blogs/:id', userIsLogin, function (req,res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedblog){
        if (err) {
            console.log(err)
        }else{
            res.redirect('/blogs/'+req.params.id);
        }
    })
    })

    //---------------- Blog routes end ------------------//



//----------Project--------------------//
app.get('/projects',  (req, res)=> {
    Project.find().sort({createdAt:-1})
       .then((result)=>{
        res.render("blogs", { project: result });
       })
       .catch((err)=>{
           console.log(err);
       })
});

app.get('/projectadd', userIsLogin,  function (req, res) {
    res.render("projectadd") 
});


app.post('/projects', userIsLogin, (req,res)=>{
    var name = req.body.name;
    var country = req.body.country;
    var client = req.body.client;
    var funding = req.body.funding;
    var dates = req.body.dates;
    var partner = req.body.partner;
    var detail = req.body.detail;
    var newProject = {
        name:name,
        country: country, 
        client:client,
        funding:funding,
        dates:dates,
        partner: partner,
        detail: detail
      }
      Blog.create(newProject, function(err, createdProject){
          if(err){
              console.log(err);
              res.redirect('/')
          }else{
            res.redirect('/projects/'+req.params.id);
          }
          
      })
  });


  app.get('/projects/:id', function(req,res){
    Projects.findById(req.params.id).populate("comments").exec(function(err, findedProject){
        if(err){
            console.log(err);
        }else{
            res.render('projects', {project: findedProject});
        }
    });

});

app.get('/projects/:id/editproject', userIsLogin, function(req,res){
    Project.findById(req.params.id, function(err, findedproject){
        if(err){
            console.log(err);
        }else{
            res.render('editproject', {project: findedproject});
        }
    })
    });

    app.put('/projects/:id', userIsLogin, function (req,res) {
    Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedproject){
        if (err) {
            console.log(err)
        }else{
            res.redirect('/projects/'+req.params.id);
        }
    })
    })

    //---------------- Project routes end ------------------//


app.get('/services',  function (req, res) {
    res.render('services');
});

app.get('/careers', function(req,res){
    res.render('careers');
});

app.get('/libraries', function(req,res){
    res.render('library');
});

app.get('/about', function(req,res){
    res.render('about');
});
app.get('/contact', function(req,res){
    res.render('contact');
});

app.get('/thanks', function(req,res){
    res.render('thanks');
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
        