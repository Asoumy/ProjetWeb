var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
require('xmlhttprequest');

// registration
const fs = require('fs');
const s = path.sep;
const app = express();

// session
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// static files
app.use(express.static(__dirname + '/public/javascripts'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + s + 'files' + s + 'users'));

var sess;

// Login request
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
   sess = req.session;
   res.sendFile(__dirname + '/public/index.html');
});

app.get('/search', function(req, res, next){
  if(req.session.userID){
     res.sendFile(__dirname + '/public/search.html');
  }
  else {
     res.redirect('/');
  }
});

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

app.listen(8080);

//registration
app.get('/register', function(req, res){
  res.sendFile(__dirname + '/public/registration.html');
});

app.post('/register', function(req, res){
  // do some checkins on form vars
  var user = {name: req.param('loginsu'), email: req.param('emailsu'),
                password : req.param('passwordsu')};
  //+++ verifier que le login n'existe pas deja
  fs.writeFile(__dirname + s + 'files'+ s +'users' + s + req.param('loginsu') + '.json', JSON.stringify(user), function(err) {
  });

  // redirect to "account created" page
});
// req.session.userID
/*
router.get('/user', function(){
  if(req.session.userID){
    res.json(user)
  }
})
*/
