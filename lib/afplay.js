
var spawn = require('child_process').spawn;
var path = require('path');

// Plays a *.mp3 file using the afplay command.
exports.exec = function(soundFile, cb) {
    
    var soundFilePath = path.join(process.env.SOUND_DIRECTORY || '/usr/local/BuildSounds', soundFile);
    console.log('Playing sound file', soundFilePath);

    var play = spawn('afplay', [soundFilePath]);

    play.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    play.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    play.on('exit', function (code) {
      cb(code);
    });
};

exports.setSoundLevel = function(level, cb) {
    
    if (typeof level !== "number" || (typeof level === "number" && level < 0 || level > 10)) {
      return cb("Invalid level", null);
    }

    var levels = spawn('osascript', ['-e', 'set Volume ' + level]);

    levels.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    levels.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    levels.on('exit', function (code) {
      cb(code);
    });
};

exports.stop = function(cb) {
    var stop = spawn('killall', ['-STOP', 'afplay']);

    stop.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    stop.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    stop.on('exit', function (code) {
      cb(code);
    });
};