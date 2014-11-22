workWherever
============
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/thewillhuang/workWherever?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<img src="https://travis-ci.org/thewillhuang/workWherever.svg" alt="Travis CI Badge"></img>

## Heroku API Server
https://work-wherever.herokuapp.com/
(No server side public UI)

## Authentication
The product of this project is an anonymous user iOS application. We had a plan with lower priority than completing MVP features to protect every endpoint with a token. Communication between a couple of endpoints on the server and iOS web view is protected by a JWT token.

```
$ open lib/jwt.js
$ open routes/post_handler.js
$ open routes/speedtest_post_handler.js
```

## Testing
9 tests passed live at the presentation. Here is a link to Travis builds: https://travis-ci.org/thewillhuang/workWherever/builds

## API
All of success responses from the server are using JSON. Router code is located in ```routes/```.

## Modular Code
One request handler is implemented in one module per endpoint.
```javascript
var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

app.get('/speedtest/api/:sizeKbs', require('./routes/speedtest_get_handler'));
app.post('/speedtest/api', require('./routes/speedtest_post_handler'));
//directly returns google places api search objects for ios.
app.get('/google/api/:search', require('./routes/get_handler_for_google'));
//with injected speedtest data as a property of each unique place_id
app.get('/google/inj/:search', require('./routes/google_inject_handler'));
app.post('/api', require('./routes/post_handler'));

app.listen(app.get('port'));
```
Two helper functions are implemented in modules.
```
$ open jwt.js
$ open speedtest.js
```

## Clean Code
Using jshint and jscs as part of the build/test and all server side code is jshint/jscs clean.

## Schema Design
We use Mongo DB and Mongoose for storing data on server backend. Using Lodash for functional programming.
```
$ open models/testResult.js
```
Initial set of data for MVP:
```javascript
var resultsSchema = new Schema({
  placeID:  String,
  downloadMbps: [Number],
  uploadMbps: [Number],
  pingMs: [Number],
  parkingRating: [Number]
});
```

## Deployment
Server application is deployed to Heroku (https://work-wherever.herokuapp.com/). Using New Relic for monitoring.

## Presentation
//TODO: link to slides and diagrams

## Teamwork
Division of work: Brian - iOS experience design and development, Hiroshi - server post request handling, Josh - iOS experience / communication design and development, William - server database design and get request handling. We communicated well and frequently on Gitter (https://gitter.im/thewillhuang/workWherever) and face-to-face at Code Fellows.
