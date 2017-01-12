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
const PersonaSchema = Schema({
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

Persona.path('model').validate(function (v) {
    return ((v != "") && (v != null));
});

module.exports = mongoose.model('mod_persona', Persona);