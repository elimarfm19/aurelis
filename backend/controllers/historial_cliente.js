'use strict';

const HistorialCliente = require('../models/historial_cliente')
const Cierre = require('../models/cierre')
const Entrega = require('../models/entrega')
const Cliente = require('../models/cliente')

function getHistorialCliente(req,res){
	

	let clienteId = req.params.id

	HistorialCliente.find({ cliente:clienteId }).sort( { _id:+1 } )
	.populate({
		path: 'cierre',
		model: 'Cierre'
		
	}).populate({
		path: 'cliente',
		model: 'Cliente'
	}).populate({
		path: 'entrega',
		model: 'Entrega'
	})
	.exec(function(err,historiales){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!historiales) return res.status(404).send({message:'el Cliente no posee Hstorial'})
	 	res.status(200).send(historiales)
	});

	// HistorialCliente.find({ cliente:clienteId },(err,historiales)=>{
	//  	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	//  	if(!historiales) return res.status(404).send({message:'el Cliente no posee Hstorial'})
	 	
	//  	res.status(200).send(historiales)
	// })
}
function getHistorialClienteEntrega(req,res){
	

	let entregaId = req.params.id

	HistorialCliente.find({ entrega:entregaId })
	.populate({
		path: 'cierre',
		model: 'Cierre'
		
	}).populate({
		path: 'cliente',
		model: 'Cliente'
	}).populate({
		path: 'entrega',
		model: 'Entrega'
	})
	.exec(function(err,historiales){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!historiales) return res.status(404).send({message:'el Cliente no posee Hstorial'})
	 	res.status(200).send(historiales)
	});
}
function getHistorialClienteEntregas(req,res){
	

	let historialClienteId = req.params.id

	HistorialCliente.find({"HistorialClienteId" : {"$gte" : historialClienteId}})
	.populate({
		path: 'cierre',
		model: 'Cierre'
		
	}).populate({
		path: 'cliente',
		model: 'Cliente'
	}).populate({
		path: 'entrega',
		model: 'Entrega'
	})
	.exec(function(err,historiales){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!historiales) return res.status(404).send({message:'el Cliente no posee Hstorial'})
	 	res.status(200).send(historiales)
	});
}

function getHistorialClienteFechas(req,res){
	

	let clienteId = req.params.id
	let FechaInicio = req.params.fechai
	let FechaFin = req.params.fechaf

	HistorialCliente.find({"fecha" : {"$gte" : FechaInicio, "$lte" : FechaFin}, "cliente": clienteId}).sort( { _id:+1 } )
	.populate({
		path: 'cierre',
		model: 'Cierre'
		
	}).populate({
		path: 'cliente',
		model: 'Cliente'
	}).populate({
		path: 'entrega',
		model: 'Entrega'
	})
	.exec(function(err,historiales){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!historiales) return res.status(404).send({message:'el Cliente no posee Hstorial'})
	 	res.status(200).send(historiales)
	});

	// HistorialCliente.find({ cliente:clienteId },(err,historiales)=>{
	//  	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	//  	if(!historiales) return res.status(404).send({message:'el Cliente no posee Hstorial'})
	 	
	//  	res.status(200).send(historiales)
	// })
}
function storeHistorialCliente(req,res){
	
	let historialCliente = new HistorialCliente()

    historialCliente.fecha = req.body.fecha
    historialCliente.fecha_cierre = req.body.fecha_cierre
    historialCliente.fecha_entrega = req.body.fecha_entrega
    historialCliente.cierre = req.body.cierre
    historialCliente.entrega = req.body.entrega
    historialCliente.cliente = req.body.cliente
    historialCliente.cerrado =  Number(req.body.cerrado)
    historialCliente.entregado =  Number(req.body.entregado)
    historialCliente.pendiente = Number(req.body.pendiente)
    

	historialCliente.save((err,historialClienteStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(historialClienteStored)		

	})

}
function updateHistorialCliente(req,res){
	let historialId = req.params.id
	let update = req.body

		HistorialCliente.findByIdAndUpdate(historialId,update,(err,historialUpdated)=>{
			if(err) return res.status(500).send({message:`Error al actualizar el pago: ${ err }`})
			
			res.status(200).send(historialUpdated)
			
		})

}


module.exports = {
	getHistorialCliente,
	storeHistorialCliente,
	getHistorialClienteFechas,
	getHistorialClienteEntrega,
	updateHistorialCliente,
	getHistorialClienteEntregas
}