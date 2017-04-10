'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Proveedor = require('../models/proveedor');
var CierreProveedor = require('../models/cierre_p');
var Recepcion = require('../models/recepcion');

// ESQUEMA PARA Historial de Proveedor

const HistorialProveedor = Schema({
     fecha: String,
     fecha_cierre: String,
     fecha_entrega: String,
     cierre: { type: Schema.ObjectId, ref: "CierreProveedor" },
     entrega: { type: Schema.ObjectId, ref: "Entrega" },
     recepcion: { type: Schema.ObjectId, ref: "Recepcion" }, 
     proveedor: { type: Schema.ObjectId, ref: "Proveedor" },
     pendiente: Number
});
module.exports = mongoose.model('HistorialProveedor', HistorialProveedor);