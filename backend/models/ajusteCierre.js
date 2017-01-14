'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA AJUSTES
var ajusteCierre = new Schema({
    cod_pieza: String,
    cod_entrega: String,
    fecha: Date,
    peso_bruto: Number,
    ley: Number,
    puro: Number,
    peso_entrega: Number
});

module.exports = mongoose.model('ajusteCierre', ajusteCierre);