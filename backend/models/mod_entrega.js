'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA ENTREGA
var Entrega = new Schema({
    cod_cierre: String,
    fecha: Date,
    cantidad: Number,
    status: Number
});

Ajuste.path('model').validate(function (v) {
    return ((v != "") && (v != null));
});

module.exports = mongoose.model('mod_entrega', Entrega);