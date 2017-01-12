'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* IMAGEN PARA PERSONAS
const Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: { type: String, required: true }
});
*/
// ESQUEMA PARA PERSONAS
const Persona = Schema({
    tipo_persona: {
        type: String,
        enum: ['Cliente','Proveedor']
    },
    nombres: String,
    apellidos: String,
    ced_rif: String,
    tlf: String,
    direccion: String,
    email: String  
});

module.exports = mongoose.model('Persona', Persona);