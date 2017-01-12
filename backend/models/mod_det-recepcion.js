'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA DETALLE DE RECEPCION
var detRecepcion = new Schema({
    cod_pieza: String
});

detPago.path('model').validate(function (v) {
    return ((v != "") && (v != null));
});

module.exports = mongoose.model('mod_det-recepcion', detRecepcion);