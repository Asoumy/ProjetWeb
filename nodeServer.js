var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
require('xmlhttprequest');

// registration
const fs = require('fs');
const s = path.sep;
const app = express();
const viewsUri = __dirname + s + 'public';
const articlesUri = __dirname + s + "files" + s + "articles";
const reqfilesUri = __dirname + s + "files" + s + "requested";
var requestedFile;
// session
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// static files
app.use(express.static(__dirname + '/public/javascripts'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + s + 'files' + s + 'users'));

var sess;

app.listen(8080);

// Login page
app.post('/', function(req, res, next){
   sess = req.session;
   var c = true;
   // check form vars
   try{
     userFilePath = __dirname + s + "files"+ s + "users" + s + req.body.login + '.json';
     let rawdata = fs.readFile(userFilePath,
             (err, data) => {
              if(err) throw err;
            });

    var user = require(userFilePath);

    console.log("pwd " + user.password);

    if(user.password == req.body.password){
      sess.userID = req.body.login;
      console.log("login est " + sess.userID);
      res.redirect('/search');
    }
  }
    catch(err){
      console.log("Mauvais identifiant");
      res.redirect('/');
      return;
    }
   // 18 dec 9:30 opt aprem BDD puis Reseau

});
app.get('/', function(req, res, next){
   if(req.session.userID)
     res.redirect('/home');

   res.sendFile(viewsUri + s + 'index.html');
});

// Search page
app.get('/search', function(req, res, next){
  if(req.session.userID){
     res.sendFile(__dirname + '/public/search.html');
  }
  else {
     res.redirect('/');
  }
});

// loging out
app.post('/logout', function(req, res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
})});

app.get('/logout',function(req,res){
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.redirect('/');
  }
})});

// home

app.get('/home', function(req, res){

});

//registration
app.get('/register', function(req, res){
  res.sendFile(__dirname + '/public/registration.html');
});

app.post('/register', function(req, res){
  // // TODO:  do some checkins on form vars

  var user = {name: req.param('loginsu'), email: req.param('emailsu'),
                password : req.param('passwordsu')};

  // // TODO: Verify if login doesnt exist already
  fs.writeFile(__dirname + s + 'files'+ s +'users' + s + req.param('loginsu') + '.json', JSON.stringify(user), function(err) {
  });

  // redirect to "account created" page
});

//Articles

app.get('/addarticle', function(req, res){
  if(!req.session.userID)
    res.redirect('/');

    res.sendFile(viewsUri + s + 'addArticle.html');
});

app.post('/addarticle', function(req, res){
  if(!req.session.userID)
    res.redirect('/');

    var today = new Date();
    var currentDate = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();

    if(!req.session.userID)
      res.redirect('/');

    var article = {title: req.body.title, imagelink: req.body.imagelink, content: req.body.content};

    var articleFileName = ID() +  '_' + req.session.userID + '_' + currentDate + '.json';

    try{
    fs.writeFile(__dirname + s + 'files'+ s +'articles' + s + articleFileName, JSON.stringify(article),
     function(err) {
       if(err) throw err;
    });
  }catch(err){
      console.log("Could not write file");
      res.redirect('/');
      return;
    }

    console.log("Article add success");

    res.redirect('/home');
});

var ID = function () {
  return Math.random().toString(36).substr(2, 9);
};

app.get('/article-:id', function(req, res){
  if(!req.session.userID)
    res.redirect('/');

  var id = req.params.id;
  var files = fs.readdirSync(__dirname + s + 'files' + s + 'articles');

  for(i = 0; i < files.length; i++){
    console.log(files[i].split('_')[0]);
    if(files[i].split('_')[0] == id){

      requestedFile = articlesUri + s + files[i];
      console.log(requestedFile);

      res.sendFile(viewsUri + s + 'article.html');
      /*
      var myObject, f;
      myObject = new ActiveXObject("Scripting.FileSystemObject");
      //f = myObject.file.copy(articlesUri + s + files[i], reqfilesUri + s + "requestedArticle.json");

      console.log(articlesUri + s + files[i] + " " + reqfilesUri + s + "requestedArticle.json");*/
      break;
    }
  }
});

app.get('/pr-requestedarticle', function(req, res){
  if(!req.session.userID)
    res.redirect('/');

  var article = require(requestedFile);

  res.json(article);

  res.end();

});
/*
router.get('/user', function(){
  if(req.session.userID){
    res.json(user)
  }
})
*/
