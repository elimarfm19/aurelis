'use strict'

const Entrega = require('../models/mod_entrega')
 
 function getEntrega(req,res){

	let entregaId = req.params.id

	Entrega.findById(entregaId,(err,entrega)=>{
	 	if(err) return res.status(500).send({message:'Error al realizar la peticion: ${ err }'})
	 	if(!entrega) return res.status(404).send({message:'La entrega no existe'})
	 	
	 	res.status(200).send({entrega:entrega})
	})
}

function getEntregas(req,res){
	Entrega.find({},(err,entrega)=>{
 	if(err) return res.status(500).send({message:'Error al realizar la peticion: ${ err }'})
 	if(!entrega) return res.status(404).send({message:'No hay registros de Entrega'})
 	
 	res.status(200).send({entrega:entrega})
 	})
}

function storeEntrega(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let entrega = new Entrega()

    entrega.cod_cierre = req.body.cod_cierre
    entrega.fecha = req.body.fecha
    entrega.cantidad = req.body.cantidad
    entrega.status = req.body.status

	entrega.save((err,entregaStored)=>{

		if (err) res.status(500).send({message:'Error al guardar en la base de datos: ${ err }'})
		
		
		res.status(200).send({entrega:entregaStored})		

	})

}

function updateEntrega(req,res){
	let entregaId = req.params.id
	let update = req.body

		Entrega.findByIdAndUpdate(entregaId,update,(err,entregaUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar la entrega: ${ err }'})
			
			res.status(200).send({entrega:entregaUpdated})
			
		})

}

function deleteEntrega(req,res){
	let entregaId = req.params.id

	Entrega.findById(entregaId,(err,entrega)=>{
		if(err) return res.status(500).send({message:'Error al borrar la entrega: ${ err }'})
		if(!entrega) return res.status(404).send({message:'la entrega no existe'})

		entrega.remove(err => {
			if(err) return res.status(500).send({message:'Error al borrar la entrega: ${ err }'})
			res.status(200).send({message:'la entrega ha sido eliminado'})
		})
	})
}

module.exports = {
	getEntrega,
	getEntregas,
	storeEntrega,
	updateEntrega,
	deleteEntrega
}
