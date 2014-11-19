'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/test');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

app.delete('/api/:id', require('./routes/delete_by_id_handler'));

app.get('/speedtest/api/:sizeKbs', require('./routes/speedtest_get_handler'));
app.post('/speedtest/api', require('./routes/speedtest_post_handler'));
//returns google places api search objects for ios.
app.get('/google/api/:search', require('./routes/get_handler_for_google'));

app.listen(app.get('port'));
