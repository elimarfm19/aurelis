'use strict'

const Recepcion = require('../models/mod_recepcion')
 
 function getRecepcion(req,res){

	let recepcionId = req.params.id

	Recepcion.findById(recepcionId,(err,recepcion)=>{
	 	if(err) return res.status(500).send({message:'Error al realizar la peticion: ${ err }'})
	 	if(!recepcion) return res.status(404).send({message:'La recepcion no existe'})
	 	
	 	res.status(200).send({recepcion:recepcion})
	})
}

function getRecepciones(req,res){
	Recepcion.find({},(err,recepcion)=>{
 	if(err) return res.status(500).send({message:'Error al realizar la peticion: ${ err }'})
 	if(!recepcion) return res.status(404).send({message:'No hay registros de recepcion'})
 	
 	res.status(200).send({recepcion:recepcion})
 	})
}

function storeRecepcion(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let recepcion = new Recepcion()

    recepcion.cod_proveedor = req.body.cod_proveedor
    recepcion.fecha = req.body.fecha
    recepcion.cantidad = req.body.cantidad

	recepcion.save((err,recepcionStored)=>{

		if (err) res.status(500).send({message:'Error al guardar en la base de datos: ${ err }'})
		
		
		res.status(200).send({recepcion:recepcionStored})		

	})

}

function updateRecepcion(req,res){
	let recepcionId = req.params.id
	let update = req.body

		Recepcion.findByIdAndUpdate(recepcionId,update,(err,recepcionUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar la recepcion: ${ err }'})
			
			res.status(200).send({recepcion:recepcionUpdated})
			
		})

}

function deleteRecepcion(req,res){
	let recepcionId = req.params.id

	Recepcion.findById(recepcionId,(err,recepcion)=>{
		if(err) return res.status(500).send({message:'Error al borrar la recepcion: ${ err }'})
		if(!recepcion) return res.status(404).send({message:'la recepcion no existe'})

		recepcion.remove(err => {
			if(err) return res.status(500).send({message:'Error al borrar la recepcion: ${ err }'})
			res.status(200).send({message:'la recepcion ha sido eliminada'})
		})
	})
}

module.exports = {
	getRecepcion,
	getRecepciones,
	storeRecepcion,
	updateRecepcion,
	deleteRecepcion
}
