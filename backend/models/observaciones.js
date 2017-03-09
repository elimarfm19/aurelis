'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cierre = require('../models/cierre');

// ESQUEMA PARA Observacion
var Observacion = new Schema({
    cierre: { type: Schema.ObjectId, ref: "Cierre" },
    observacion: String,
    monto: Number
});


module.exports = mongoose.model('Observacion', Observacion);