'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cliente = require('../models/cliente');

// ESQUEMA PARA CIERRES
var Cierre = new Schema({
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
    cliente: { type: Schema.ObjectId, ref: "Cliente" }
});

module.exports = mongoose.model('Cierre', Cierre);