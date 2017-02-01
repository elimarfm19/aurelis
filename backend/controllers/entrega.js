'use strict'

const Entrega = require('../models/entrega')
//const Cierre = require('../models/cierre')
//const Pieza = require('../models/pieza')
const Cliente = require('../models/cliente')
 
 function getEntrega(req,res){

	let entregaId = req.params.id

	Entrega.findById(entregaId,(err,entrega)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!entrega) return res.status(404).send({message:'La entrega no existe'})
	 	
	 	Cliente.populate(entrega, {path: "cliente"},function(err, entrega){
            res.status(200).send(entrega);
        }); 
	})
}

function getEntregas(req,res){
	

	Entrega.find({},(err,entregas)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(entregas== "") return res.status(404).send({message:'No hay registros de entregas para este proveedor'})
 	
 	Cliente.populate(entregas, {path: "cliente"},function(err, entregas){
            res.status(200).send(entregas);
        }); 

 	})
}

function getEntregasCliente(req,res){

	let ClienteId = req.params.id

	Entrega.find({cliente:ClienteId},(err,entregas)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(entregas== "") return res.status(404).send({message:'No hay registros de entregas para este cliente'})
 	
 	Cliente.populate(entregas, {path: "cliente"},function(err, entregas){
            res.status(200).send(entregas);
        }); 

 	})
}

function getCierresPieza(req,res){

	let PiezaId = req.params.id

	Cierre.find({pieza:PiezaId},(err,cierre)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(cierre == "") return res.status(404).send({message:'No hay registros de Cierres'})
 	
 	Pieza.populate(cierre, {path: "pieza"},function(err, cierre){
            res.status(200).send(cierre);
        }); 

 	})
}

function storeEntrega(req,res){
	//console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let entrega = new Entrega()

    entrega.fecha_entrega = new Date, 'dd/MM/yyyy'
    entrega.cantidad = req.body.cantidade
    entrega.cliente = req.body.cliente

	entrega.save((err,entregaStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(entregaStored)	

	})

}

function updateEntrega(req,res){
	let entregaId = req.params.id
	let update = req.body
		
		Entrega.findByIdAndUpdate(entregaId,update,(err,entregaUpdated)=>{
			if(err) return res.status(500).send({message:`Error al actualizar la entrega: ${ err }`})			
			res.status(200).send(entregaUpdated)			
		})

}

function deleteEntrega(req,res){
	let entregaId = req.params.id

	Entrega.findById(entregaId,(err,entrega)=>{
		if(err) return res.status(500).send({message:`Error al borrar la entrega: ${ err }`})
		if(!entrega) return res.status(404).send({message:'la entrega no existe'})

		entrega.remove(err => {
			if(err) return res.status(500).send({message:`Error al borrar la entrega: ${ err }`})
			res.status(200).send({message:'la entrega ha sido eliminada'})
		})
	})
}

module.exports = {
	getEntrega,
	getEntregas,
	getEntregasCliente,
	getCierresPieza,
	storeEntrega,
	updateEntrega,
	deleteEntrega	
	
}
