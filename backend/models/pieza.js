'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA PIEZA
var Pieza = new Schema({
    cod_proveedor: String,
    status: String,
    peso_bruto: Number,
    ley: Number,
    puro: Number,
    peso_entrega: Number,
    ajuste: String
});

module.exports = mongoose.model('mod_pieza', Pieza);