'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Proveedor = require('../models/proveedor');

// ESQUEMA PARA CIERRES
var Cierre_p = new Schema({
    fecha_cierre: Date,
    fecha_entrega: Date,
    cantidad: Number,
    precio: Number,
    total: Number,
    monto_pagado: Number,
    status: {
        type: String,
        enum: ['Abierto','Cerrado','Eliminado']
    },
    proveedor: { type: Schema.ObjectId, ref: "Proveedor" }
});

module.exports = mongoose.model('Cierre_p', Cierre_p);