'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA DETALLE DE ENTREGA
var detEntrega = new Schema({
    cod_pieza: String
});

module.exports = mongoose.model('detEntrega', detEntrega);