'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA CIERRES
var Cierre = new Schema({
    cod_persona: String,
    fecha_cierre: Date,
    fecha_entrega: Date,
    cantidad: Number,
    precio: Number,
    total: Number,
    monto_pagado: Number,
    status: String 
});

module.exports = mongoose.model('Cierre', Cierre);