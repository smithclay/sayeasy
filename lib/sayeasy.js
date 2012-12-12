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
var fs = require('fs');
var path = require('path');
var afplay = require('./afplay');

app.use(express.bodyParser());

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.get('/', function(req, res){
  res.send('welcome to sayeasy');
});

app.get('/sounds', function(req, res){
  var soundDirectory = process.env.SOUND_DIRECTORY || '/usr/local/BuildSounds';
  fs.readdir(soundDirectory, function(err, files) {
    if (!Array.isArray(files)) {
      return res.send(500, 'No files found.');
    }

    if (err) {
      return res.send(500, err);
    }

    var mp3Files = files.filter(function(f) {
      return path.extname(f) === '.mp3';
    });
    
    if (!Array.isArray(mp3Files) || mp3Files.length === 0) {
      return res.send(404, 'No *.mp3 files found.');
    }

    res.send(200, mp3Files);
  });
});

app.get('/stop', function(req, res) {
  afplay.stop(function(code) {
    res.send(200);
  });
});

app.post('/speak', function(req, res){
  var text = req.param('text');  // second parameter is default
  var voice = req.param('voice') || 'Alex';
  var sound = req.param('sound');

  // Text is required.
  if (!text) {
    return res.send(400, 'Bad request: speak text not specified.');
  }

  if (sound) {
    afplay.exec(sound, function(code) {
      console.log('afplay result:', code);
    });
  }

  say.speak(voice, text, function() {
    res.send(200);
  });
});

exports.start = function() {
    app.listen(process.env.PORT || 4000);
};