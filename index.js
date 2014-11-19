'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var parsePost = require('./lib/parse_post');
var isp = require('./lib/isp');

mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/test');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

app.post('/api', [parsePost, isp], require('./routes/post_handler'));
app.get('/api/:id', require('./routes/get_by_id_handler'));
app.delete('/api/:id', require('./routes/delete_by_id_handler'));
app.get('/stub/get', require('./routes/get_all_handler'));

app.get('/speedtest/api/:sizeKbs', require('./routes/speedtest_get_handler'));
app.post('/speedtest/api', require('./routes/speedtest_post_handler'));

app.listen(app.get('port'));
