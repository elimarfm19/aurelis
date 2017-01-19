'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Recepcion = require('../models/recepcion');
// ESQUEMA PARA PIEZA
var Pieza = new Schema({
    
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
    },
    recepcion: { type: Schema.ObjectId, ref: "Recepcion" }
});

module.exports = mongoose.model('Pieza', Pieza);
