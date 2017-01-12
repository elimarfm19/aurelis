'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA DETALLE DE PAGO
var detPago = new Schema({
    status: String ,
    ref: String,
    banco: String,
    titular: String,
    monto: Number
});

detPago.path('model').validate(function (v) {
    return ((v != "") && (v != null));
});

module.exports = mongoose.model('mod_det-pago', detPago);