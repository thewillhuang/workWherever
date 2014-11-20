'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var uriUtil = require('mongodb-uri');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
var mongodbUri = process.env.MONGOLAB_URI;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri || 'mongodb://localhost/test', options);

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

app.delete('/api/:id', require('./routes/delete_by_id_handler'));

app.get('/speedtest/api/:sizeKbs', require('./routes/speedtest_get_handler'));
app.post('/speedtest/api', require('./routes/speedtest_post_handler'));
//directly returns google places api search objects for ios.
app.get('/google/api/:search', require('./routes/get_handler_for_google'));
//with injected speedtest data as a property of each unique place_id
app.get('/google/inj/:search', require('./routes/google_inject_handler'));
app.post('/api', require('./routes/post_handler'));

app.listen(app.get('port'));
