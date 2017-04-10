'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
	autoIncrement.initialize(mongoose);
var Cliente = require('../models/cliente');
var Cierre = require('../models/cierre');
var Entrega = require('../models/entrega');

// ESQUEMA PARA Historial de Clientes
const HistorialCliente = Schema({
	HistorialClienteId: Number,
    fecha: String,
    fecha_cierre:String,
    fecha_entrega:String,
    cierre: { type: Schema.ObjectId, ref: "Cierre" },
    entrega: { type: Schema.ObjectId, ref: "Entrega" },
    cliente: { type: Schema.ObjectId, ref: "Cliente" },
    cerrado:Number,
    entregado:Number,
    pendiente: Number
});

HistorialCliente.plugin(autoIncrement.plugin, {
    model: 'HistorialCliente',
    field: 'HistorialClienteId',
    startAt: 1
});

module.exports = mongoose.model('HistorialCliente', HistorialCliente);