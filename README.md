# sayeasy

RESTful wrapper around say.js. Runs on Mac OS X.

## Getting Started
Install the module with: `npm install sayeasy`

```javascript
var sayeasy = require('sayeasy');
sayeasy.start();
```

## Examples

### `/speak`

`/speak` is a endpoint that accepts an HTTP `POST` request with two parameters:

* voice - The Mac OS X voice to speak the text. (optional, default: 'Bruce')
* text - The text to speak. (required)
* sound - The name of an *.mp3 file in `process.env.SOUND_DIRECTORY` to play.

```sh
sh $ curl -X POST -dtext='Hello World' -dvoice=Bruce http://localhost:4000/speak
```

### `/sounds`

`/sounds` is an endpoint that accepts an HTTP `GET` request to return a JSON array of *.mp3 files sayeasy can play. The directory sayeasy uses to look for *.mp3 files is configured in the `SOUND_DIRECTORY` environment variable (default: `/usr/local/BuildSounds`).
 
### `/stop`

Stop all `afplay` processes on the system.

## Release History
0.1.0 - Initial Release

## License
Copyright (c) 2012 Clay Smith  
Licensed under the MIT license.
