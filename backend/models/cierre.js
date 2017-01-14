'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA CIERRES
var Cierre = new Schema({
    id_cierre: String,
    cod_persona: String,
    fecha_cierre: Date,
    fecha_entrega: Date,
    cantidad: Number,
    precio: Number,
    total: Number,
    monto_pagado: Number,
    status: {
        type: String,
        enum: ['Abierto','Cerrado','Eliminado']
    }
});

module.exports = mongoose.model('Cierre', Cierre);