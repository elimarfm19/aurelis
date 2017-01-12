'use strict'

const detEntrega = require('../models/detEntrega')
 
 function getdetEntrega(req,res){

	let detEntregaId = req.params.id

	DetEntrega.findById(detEntregaId,(err,detEntrega)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!detEntrega) return res.status(404).send({message:'La Entrega no existe'})
	 	
	 	res.status(200).send(detEntrega)
	})
}

function getdetEntregas(req,res){
	detEntrega.find({},(err,detEntrega)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(detEntrega == "") return res.status(404).send({message:'No hay registros de Entregas'})
 	
 	res.status(200).send(detEntrega)
 	})
}

function storedetEntrega(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let detEntrega = new DetEntrega()

    detEntrega.cod_pieza = req.body.cod_pieza

	detEntrega.save((err,detEntregaStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(detEntregaStored)		

	})

}

function updatedetEntrega(req,res){
	let detEntregaId = req.params.id
	let update = req.body

		DetEntrega.findByIdAndUpdate(detEntregaId,update,(err,detEntregaUpdated)=>{
			if(err) return res.status(500).send({message:`Error al actualizar el detalle de entrega: ${ err }`})
			
			res.status(200).send(detEntregaUpdated)
			
		})

}

function deletedetEntrega(req,res){
	let detEntregaId = req.params.id

	DetEntrega.findById(detEntregaId,(err,detEntrega)=>{
		if(err) return res.status(500).send({message:`Error al borrar el detalle de entrega: ${ err }`})
		if(!detEntrega) return res.status(404).send({message:'el detalle de entrega no existe'})

		detEntrega.remove(err => {
			if(err) return res.status(500).send({message:`Error al borrar el detalle de entrega: ${ err }`})
			res.status(200).send({message:'el detalle de entrega ha sido eliminado'})
		})
	})
}

module.exports = {
	getdetEntrega,
	getdetEntregas,
	storedetEntrega,
	updatedetEntrega,
	deletedetEntrega
}
