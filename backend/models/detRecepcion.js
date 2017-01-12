'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA DETALLE DE RECEPCION
var detRecepcion = new Schema({
    cod_pieza: String
});


module.exports = mongoose.model('detRecepcion', detRecepcion);