'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ESQUEMA PARA PERSONAS
const Cliente = Schema({
    nombres: String,
    apellidos: String,
    nacionalidad:{
        type:String,
        enum: ['V','E','J'],
        default:'V'
    },
    ced_rif:{
        type: String,
        unique:true
    },
    tlf: String,
    direccion: String,
    email: String,
    cerrado:Number,
    entregado:Number,
    ultima_entrega: Date  
});
module.exports = mongoose.model('Cliente', Cliente);