'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// ESQUEMA PARA User
var User = new Schema({
    username: String,
    password: String
});


module.exports = mongoose.model('User', User);