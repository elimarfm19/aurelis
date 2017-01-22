'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

var Cliente = require('../models/cliente');
var Pieza = require('../models/pieza');

// ESQUEMA PARA ENTREGA
var Entrega = new Schema({
    EntregaId: Number,
    fecha_entrega: Date,
    cantidad: Number,
    cliente: { type: Schema.ObjectId, ref: "Cliente" },
});

Entrega.plugin(autoIncrement.plugin, {
    model: 'Entrega',
    field: 'EntregaId',
    startAt: 1
});

module.exports = mongoose.model('Entrega', Entrega);