'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var parsePost = require('./lib/parse_post');
var isp = require('./lib/isp');

var postHandler = require('./routes/post_handler');
var getByIdHandler = require('./routes/get_by_id_handler');

mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/test');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

app.post('/api', [parsePost, isp], postHandler);
app.get('/api/:id', getByIdHandler);

app.listen(app.get('port'));
