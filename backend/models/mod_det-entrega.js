'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA PARA DETALLE DE ENTREGA
var detEntrega = new Schema({
    cod_pieza: String
});

detEntrega.path('model').validate(function (v) {
    return ((v != "") && (v != null));
});

module.exports = mongoose.model('mod_det-entrega', detEntrega);