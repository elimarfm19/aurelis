'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Recepcion = require('../models/recepcion');
var Entrega = require('../models/entrega');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

// ESQUEMA PARA PIEZA
var Pieza = new Schema({
    
    status: {
        type:String,
        enum: ['Disponible', 'Entregado','Ajuste','Verificado']
    },
    piezaId: Number,
    peso_bruto: Number,
    ley: Number,
    puro_c: Number,
    puro_p: Number,
    peso_entrega: Number,
    observacion: String,
    recepcion: { type: Schema.ObjectId, ref: "Recepcion" },
    entrega: { type: Schema.ObjectId, ref: "Entrega" }
});

Pieza.plugin(autoIncrement.plugin, {
    model: 'Pieza',
    field: 'piezaId',
    startAt: 1
});

module.exports = mongoose.model('Pieza', Pieza);
