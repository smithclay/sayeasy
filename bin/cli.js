#!/usr/bin/env node

var querystring = require('querystring');
var http = require('http');

var args = process.argv.slice(2);
var voiceIndex = args.indexOf('-v');

if (args.length === 0 || voiceIndex === 0 || voiceIndex + 1 >= args.length) {
    return console.log('usage: [text to speak] -v [voice]');
}

var voice = voiceIndex !== -1 ? args[voiceIndex + 1] : '';
var text = voice ? args.slice(0, voiceIndex).join(' ') : args.join(' ');

var post_data = querystring.stringify({
  'text': text,
  'voice': voice
});

console.log('Speaking: %s', text);

// An object of options to indicate where to post to
var options = {
  host: process.env.SAYEASY_HOST || 'localhost',
  port: process.env.SAYEASY_PORT || 4000,
  path: '/speak',
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': post_data.length
  }
};

var post_req = http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
      console.log(chunk);
  });
});

post_req.write(post_data);
post_req.end();