'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Proveedor = require('../models/proveedor');
var Pieza = require('../models/pieza');

// ESQUEMA PARA RECEPCIONES
var Recepcion = new Schema({

    cod_recepcion: String,
    fecha_recepcion: Date,
    cantidad: Number,
    proveedor: { type: Schema.ObjectId, ref: "Proveedor" },
    pieza: { type: Schema.ObjectId, ref: "Pieza" } 
});

module.exports = mongoose.model('Recepcion', Recepcion);