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

module.exports = mongoose.model('Entrega', Entrega);