'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CierreProveedor = require('../models/cierre_p');


// ESQUEMA PARA PAGOS
var PagoProveedor = new Schema({
    //fecha: Date,
    referencia: String,
    banco: String,
    titular: String,
    monto_pagado: Number,
    cierre_p: { type: Schema.ObjectId, ref: "CierreProveedor" }
});

module.exports = mongoose.model('PagoProveedor', PagoProveedor);