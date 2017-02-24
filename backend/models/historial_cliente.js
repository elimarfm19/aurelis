'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Cliente = require('../models/cliente');
var Cierre = require('../models/cierre');
var Entrega = require('../models/entrega');

// ESQUEMA PARA Historial de Clientes
const HistorialCliente = Schema({
     fecha: String,
     cierre: { type: Schema.ObjectId, ref: "Cierre" },
     entrega: { type: Schema.ObjectId, ref: "Entrega" },
     cliente: { type: Schema.ObjectId, ref: "Cliente" },
     pendiente: Number
});
module.exports = mongoose.model('HistorialCliente', HistorialCliente);