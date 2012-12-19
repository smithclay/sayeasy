# sayeasy

RESTful wrapper around say.js. Runs on Mac OS X.

## Getting Started
Install the module with: `npm install sayeasy`

```javascript
var sayeasy = require('sayeasy');
sayeasy.start();
```
## Command Line Interface (CLI)

sayeasy comes with a easy-to-use CLI tool that sends text to a sayeasy server.

If you run `npm install -g sayeasy` the sayeasy CLI will be available in your `PATH`:

To speak "Hello World!" using the Cellos voice on `localhost:4000`:

```sh
  sh $ sayeasy Hello World! -v Cellos
```

Want to run the sayeasy command on a different server/port than `localhost:4000`, set these environment variables:

```sh
 sh $ export SAYEASY_SERVER=10.10.10.10
 sh $ export SAYEASY_PORT=3003
```

## Server Endpoints

### `/speak`

`/speak` is a endpoint that accepts an HTTP `POST` request with two parameters:

* voice - The Mac OS X voice to speak the text. (optional, default: 'Bruce')
* text - The text to speak. (required)
* sound - The name of an *.mp3 file in `process.env.SOUND_DIRECTORY` to play.

### `/levels`

`/levels` is a HTTP `POST` endpoint that sets the system volume.

* volume - A number [0-10] that sets the system volume. 0 is mute and 10 is the highest. 

### `/sounds`

`/sounds` is an endpoint that accepts an HTTP `GET` request to return a JSON array of *.mp3 files sayeasy can play. The directory sayeasy uses to look for *.mp3 files is configured in the `SOUND_DIRECTORY` environment variable (default: `/usr/local/BuildSounds`).
 
### `/stop`

Stop all `afplay` processes on the system.

## cURL Example

```sh
sh $ curl -dtext='Hello World' -dvoice=Bruce http://localhost:4000/speak
```

## Release History
0.1.1 - Include CLI Tool
0.1.0 - Initial Release

## License
Copyright (c) 2012 Clay Smith  
Licensed under the MIT license.
