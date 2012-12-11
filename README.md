# sayeasy

RESTful wrapper around say.js. Runs on Mac OS X.

## Getting Started
Install the module with: `npm install sayeasy`

```javascript
var sayeasy = require('sayeasy');
sayeasy.start();
```

## Examples

### `/speak` endpoint

`/speak` is a endpoint that accepts an HTTP `POST` request with two parameters:

* voice - The Mac OS X voice to speak the text. (optional, default: 'Bruce')
* text - The text to speak. (required)

```sh
curl -X POST -dtext='Hello World' -dvoice=Bruce http://localhost:4000/speak
```

## Release History
0.1.0 - Initial Release

## License
Copyright (c) 2012 Clay Smith  
Licensed under the MIT license.
