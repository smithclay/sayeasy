/*
 * sayeasy
 * https://github.com/smithclay/sayeasy
 *
 * Copyright (c) 2012 Clay Smith
 * Licensed under the MIT license.
 */

var express = require('express');
var app = express();
var say = require('say');

app.use(express.bodyParser());

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.get('/', function(req, res){
  res.send('welcome to sayeasy');
});

app.post('/speak', function(req, res){
  var text = req.param('text');  // second parameter is default
  var voice = req.param('voice') || 'Alex';
  
  // Text is required.
  if (!text) {
    return res.send(400, 'Bad request: speak text not specified.');
  }

  say.speak(voice, text, function() {
    res.send(200);
  });
});

exports.start = function() {
    app.listen(process.env.PORT || 4000);
};