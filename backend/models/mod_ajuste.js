'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA AJUSTES
var Ajuste = new Schema({
    cod_pieza: String,
    cod_entrega: String,
    fecha: Date,
    peso_bruto: Number,
    ley: Number,
    puro: Number,
    peso_entrega: Number
});

Ajuste.path('model').validate(function (v) {
    return ((v != "") && (v != null));
});

module.exports = mongoose.model('mod_ajuste', Ajuste);