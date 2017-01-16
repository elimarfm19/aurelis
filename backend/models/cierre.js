'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
 
autoIncrement.initialize(mongoose);
var Cliente = require('../models/cliente');

// ESQUEMA PARA CIERRES
var Cierre = new Schema({
    CierreId:Number,
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

Cierre.plugin(autoIncrement.plugin, { model: 'Cierre', field: 'CierreId' });

module.exports = mongoose.model('Cierre', Cierre);