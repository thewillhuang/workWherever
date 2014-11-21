'use strict';

var jwt = require('jwt-simple');
var secret = process.env.JWT_SECRET || 'developmentsecret';

module.exports = {
  encode: function(id) {
    return jwt.encode({id: id}, secret);
  },

  decode: function(token) {
    var id;
    try { id = jwt.decode(token, secret); }
    catch (err) { id = null; }
    return id;
  }
};
