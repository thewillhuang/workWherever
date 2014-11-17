'use strict';

var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'));
