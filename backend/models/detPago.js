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

module.exports = mongoose.model('detPago', detPago);