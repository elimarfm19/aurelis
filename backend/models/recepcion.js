'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA RECEPCIONES
var Recepcion = new Schema({
    cod_proveedor: String,
    fecha: Date,
    cantidad: Number 
});

module.exports = mongoose.model('Recepcion', Recepcion);