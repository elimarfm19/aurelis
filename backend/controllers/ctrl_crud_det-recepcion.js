'use strict'

const DetRecepcion = require('../models/mod_det-recepcion')
 
 function getdetRecepcion(req,res){

	let detRecepcionId = req.params.id

	DetRecepcion.findById(detRecepcionId,(err,detRecepcion)=>{
	 	if(err) return res.status(500).send({message:'Error al realizar la peticion: ${ err }'})
	 	if(!detRecepcion) return res.status(404).send({message:'La recepción no existe'})
	 	
	 	res.status(200).send({detRecepcion:detRecepcion})
	})
}

function getdetRecepciones(req,res){
	DetRecepcion.find({},(err,detPago)=>{
 	if(err) return res.status(500).send({message:'Error al realizar la peticion: ${ err }'})
 	if(!detRecepcion) return res.status(404).send({message:'No hay registros de Recepción'})
 	
 	res.status(200).send({detRecepcion:detRecepcion})
 	})
}

function storedetRecepcion(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let detRecepcion = new DetRecepcion()

    detRecepcion.cod_pieza = req.body.cod_pieza

	detRecepcion.save((err,detRecepcionStored)=>{

		if (err) res.status(500).send({message:'Error al guardar en la base de datos: ${ err }'})
		
		
		res.status(200).send({detRecepcion:detRecepcionStored})		

	})

}

function updatedetRecepcion(req,res){
	let detRecepcionId = req.params.id
	let update = req.body

		DetRecepcion.findByIdAndUpdate(detRecepcionId,update,(err,detRecepcionUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar el detalle de recepción: ${ err }'})
			
			res.status(200).send({detRecepcion:detRecepcionUpdated})
			
		})

}

function deletedetRecepcion(req,res){
	let detRecepcionId = req.params.id

	DetRecepcion.findById(detRecepcionId,(err,detRecepcion)=>{
		if(err) return res.status(500).send({message:'Error al borrar el detalle de recepción: ${ err }'})
		if(!detRecepcion) return res.status(404).send({message:'el detalle de recepción no existe'})

		detRecepcion.remove(err => {
			if(err) return res.status(500).send({message:'Error al borrar el detalle de recepción: ${ err }'})
			res.status(200).send({message:'el detalle de recepción ha sido eliminado'})
		})
	})
}

module.exports = {
	getdetRecepcion,
	getdetRecepciones,
	storedetRecepcion,
	updatedetRecepcion,
	deletedetRecepcion
}
