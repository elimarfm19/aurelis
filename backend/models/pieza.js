'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA PIEZA
var Pieza = new Schema({
    cod_pieza: String,
    cod_proveedor: String,
    status: {
        type:String,
        enum: ['Disponible', 'Entregado']
    },
    peso_bruto: Number,
    ley: Number,
    puro: Number,
    peso_entrega: Number,
    ajuste: {
        type:String,
        enum: ['Si', 'No']
    }
});

module.exports = mongoose.model('Pieza', Pieza);
