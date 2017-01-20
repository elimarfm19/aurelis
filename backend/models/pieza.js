'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Recepcion = require('../models/recepcion');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

// ESQUEMA PARA PIEZA
var Pieza = new Schema({
    
    status: {
        type:String,
        enum: ['Disponible', 'Entregado']
    },
    piezaId: Number,
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

Pieza.plugin(autoIncrement.plugin, {
    model: 'Pieza',
    field: 'piezaId',
    startAt: 1
});

module.exports = mongoose.model('Pieza', Pieza);
