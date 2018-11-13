var express = require('express');
var app = express();

app.get('/', function(req, res, next){
   res.sendFile( __dirname + '../public/index.html');
});

app.listen(8080);

// req.session.userID
/*
router.get('/user', function(){
  if(req.session.userID){
    res.json(user)
  }
})
*/
