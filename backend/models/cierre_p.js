'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);
var Proveedor = require('../models/proveedor');

// ESQUEMA PARA CIERRES PROVEEDOR
var CierreProveedor = new Schema({
    Cierre_pId:Number,
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

CierreProveedor.plugin(autoIncrement.plugin, {
    model: 'CierreProveedor',
    field: 'Cierre_pId',
    startAt: 1
});

module.exports = mongoose.model('CierreProveedor', CierreProveedor);