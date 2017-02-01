'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cierre = require('../models/cierre');


// ESQUEMA PARA PAGOS
var Pago = new Schema({
   // fecha: Date,
    ci: String,
    banco: String,
    titular: String,
    monto_pagado: Number,
    cierre: { type: Schema.ObjectId, ref: "Cierre" }
});


module.exports = mongoose.model('Pago', Pago);