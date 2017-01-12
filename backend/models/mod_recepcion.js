'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA RECEPCIONES
var Recepcion = new Schema({
    cod_proveedor: String,
    fecha: Date,
    cantidad: Number 
});

Cierre.path('model').validate(function (v) {
    return ((v != "") && (v != null));
});

module.exports = mongoose.model('mod_recepcion', Recepcion);