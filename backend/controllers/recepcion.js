'use strict'

const Recepcion = require('../models/recepcion')
const Cierre_p = require('../models/cierre_p')
const Pieza = require('../models/pieza')
const Proveedor = require('../models/proveedor')

 
 function getRecepcion(req,res){

	let recepcionId = req.params.id


	Recepcion.findById(recepcionId,(err,recepcion)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!recepcion) return res.status(404).send({message:'la recepcion no existe'})
	 	
	 	res.status(200).send(recepcion)
	})
}

function getRecepciones(req,res){
	Recepcion.find({})
	.populate({
		path: 'cierre_p',
		model: 'CierreProveedor',
		populate: {
			path: 'proveedor',
			model: 'Proveedor'
		}
	})
	.populate({
		path: 'proveedor',
		model: 'Proveedor'
	}).exec(function(err,recepciones){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
			if(recepciones == "") return res.status(404).send({message:'No hay registros de recepciones'})
				res.status(200).send(recepciones);
		});
}

function getCierresProveedor(req,res){

	let ProveedorId = req.params.id

	Cierre_p.find({proveedor:ProveedorId},(err,cierres_p)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(cierres_p == "") return res.status(404).send({message:'No hay registros de Cierres'})
 	
 	Proveedor.populate(cierres_p, {path: "proveedor"},function(err, cierres_p){
            res.status(200).send(cierres_p);
        }); 

 	})
}

function getCierresPieza(req,res){

	let PiezaId = req.params.id

	Cierre_p.find({pieza:PiezaId},(err,cierres_p)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(cierres_p == "") return res.status(404).send({message:'No hay registros de Cierres'})
 	
 	Pieza.populate(cierres_p, {path: "pieza"},function(err, cierres_p){
            res.status(200).send(cierres_p);
        }); 

 	})
}


function storeRecepcion(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let recepcion = new Recepcion()

    recepcion.fecha_recepcion = new Date()
    recepcion.cantidad = req.body.cantidad
    recepcion.proveedor = req.body.proveedor
    recepcion.cierre_p = req.body.cierre_p

	recepcion.save((err,recepcionStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(recepcionStored)		

	})

}

function updateRecepcion(req,res){
	let recepcionId = req.params.id
	let update = req.body

		Recepcion.findByIdAndUpdate(recepcionId,update,(err,recepcionUpdated)=>{
			if(err) return res.status(500).send({message:`Error al actualizar la recepcion: ${ err }`})
			
			res.status(200).send(recepcionUpdated)
			
		})

}

function deleteRecepcion(req,res){
	let recepcionId = req.params.id

	Recepcion.findById(recepcionId,(err,recepcion)=>{
		if(err) return res.status(500).send({message:`Error al borrar la recepcion: ${ err }`})
		if(!recepcion) return res.status(404).send({message:'la recepcion no existe'})

		recepcion.remove(err => {
			if(err) return res.status(500).send({message:`Error al borrar la recepcion: ${ err }`})
			res.status(200).send({message:'la recepcion ha sido eliminada'})
		})
	})
}

module.exports = {
	getRecepcion,
	getRecepciones,
	getCierresProveedor,
	getCierresPieza,
	storeRecepcion,
	updateRecepcion,
	deleteRecepcion
}
