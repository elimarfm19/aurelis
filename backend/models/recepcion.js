'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

var Proveedor = require('../models/proveedor');
var Pieza = require('../models/pieza');

// ESQUEMA PARA RECEPCIONES
var Recepcion = new Schema({
    RecepcionId: Number,
    fecha_recepcion: Date,
    cantidad: Number,
    proveedor: { type: Schema.ObjectId, ref: "Proveedor" },
});

Recepcion.plugin(autoIncrement.plugin, {
    model: 'Recepcion',
    field: 'RecepcionId',
    startAt: 1
});


module.exports = mongoose.model('Recepcion', Recepcion);