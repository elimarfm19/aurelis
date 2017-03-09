'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// ESQUEMA PARA User
var User = new Schema({
	userId: Number,
    username: String,
    password: String,
    remanente: Number
});


module.exports = mongoose.model('User', User);