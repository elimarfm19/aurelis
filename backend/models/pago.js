'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA PAGOS
var Pago = new Schema({
    cod_cierre: String,
    fecha: Date,
    monto_pagado: Number
});


module.exports = mongoose.model('Pago', Pago);