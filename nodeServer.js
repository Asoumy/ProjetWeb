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
const usersUri = __dirname + s + "files"+ s + "users";

// session
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// static files
app.use(express.static(__dirname + s+ 'public' + s + 'javascripts'));
app.use(express.static(__dirname + s + 'public'));
app.use(express.static(__dirname + s + 'files' + s + 'users'));

var sess;

app.listen(7777);

// Login page
app.post('/', function(req, res, next){
   sess = req.session;
   var c = true;
   // check form vars
   try{
     userFilePath = usersUri + s + req.body.login + '.json';
     let rawdata = fs.readFile(userFilePath,
             (err, data) => {
              if(err) throw err;
            });

    var user = require(userFilePath);

    console.log("pwd " + user.password);

    if(user.password == req.body.password){
      sess.userID = req.body.login;
      console.log("login est " + sess.userID);
      res.redirect('/home');
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
  if(!req.session.userID)
    res.redirect('/');

  var articles = fs.readdirSync(articlesUri);
  articles.sort(function(a, b) {
               return fs.statSync(articlesUri + s + a).mtime.getTime() -
                      fs.statSync(articlesUri + s + b).mtime.getTime();
           });

  req.session.listArticles = articles;
  res.sendFile(viewsUri + s + "Acceuil.html");
});

app.get('/pr-listarticles', function(req, res){
  if(!req.session.userID)
    res.redirect('/');

  var articles = req.session.listArticles;
  res.json(JSON.stringify(articles));

  res.end();
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
    var id = ID();

    if(!req.session.userID)
      res.redirect('/');

    var article = {id: id, url: "/article-" + id, author:req.session.userID, title: req.body.title
      , imagelink: req.body.imagelink, content: req.body.content, date: currentDate};

    var articleFileName = id +  '_' + req.session.userID + '_' + currentDate + '.json';

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

  var requestedFile;
  var id = req.params.id;
  var files = fs.readdirSync(__dirname + s + 'files' + s + 'articles');

  for(i = 0; i < files.length; i++){
    console.log(files[i].split('_')[0]);
    if(files[i].split('_')[0] == id){

      requestedFile = articlesUri + s + files[i];
      req.session.requestedFile = requestedFile;

      res.sendFile(viewsUri + s + 'article.html');
      break;
    }
  }
});

app.get('/pr-article-:id', function(req, res){
  if(!req.session.userID)
    res.redirect('/');

  var requestedFile;
  var id = req.params.id;
  var files = fs.readdirSync(__dirname + s + 'files' + s + 'articles');

  for(i = 0; i < files.length; i++){

    if(files[i].split('_')[0] == id){

      requestedFile = articlesUri + s + files[i];
      var article = require(requestedFile);
      res.json(article);
      res.end();
      break;
    }
  }
});

app.get('/pr-requestedarticle', function(req, res){
  if(!req.session.userID)
    res.redirect('/');

  var article = require(req.session.requestedFile);

  res.json(article);

  res.end();

});

// Searching

app.get('/search', function(req, res){
  if(!req.session.userID)
    res.redirect('/');

  res.sendFile(viewsUri + s + "search.html");
});

app.post('/search', function(req, res){
  if(!req.session.userID)
    res.redirect('/');

    var files = fs.readdirSync(__dirname + s + 'files' + s + 'articles');
    var c = req.body.criteria;
    var kw = req.body.keyword;
    var selectedFileIDs = [];

    for(i = 0; i < files.length; i++){

      if(c == "Reference" && files[i].split('_')[0] == kw){

        selectedFileIDs.push(files[i].split('_')[0]);
      }
      else if (c == "Author" && files[i].split('_')[1] == kw){

        selectedFileIDs.push(files[i].split('_')[0]);
      }
    }

    req.session.selectedFileIDs = selectedFileIDs;

    res.sendFile(viewsUri + s + "results.html");
});

app.get('/pr-selectedfileids', function(req, res){
  if(!req.session.userID || !req.session.selectedFileIDs)
    res.redirect('/');

  var articles = req.session.selectedFileIDs;
  res.json(JSON.stringify(articles));

  res.end();
});
