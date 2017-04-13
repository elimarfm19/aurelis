'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ESQUEMA PARA PROVEEDORES
const Proveedor = Schema({
    nombres: String,
    apellidos: String,
    nacionalidad:{
        type: String,
        enum: ['V','E','J'],
        default: 'V'
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
    ultima_entrega: Date  ,
    contacto: String,
    cerrado_m: Number, // este es el total cerrado desde la migracion
    entregado_m: Number  // este es el total cerrado desde la migracion 
});

module.exports = mongoose.model('Proveedor', Proveedor);