'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA PAGOS
var Pago = new Schema({
    cod_cierre: String,
    fecha: Date,
    monto_pagado: Number
});

Pago.path('model').validate(function (v) {
    return ((v != "") && (v != null));
});

module.exports = mongoose.model('mod_pago', Pago);