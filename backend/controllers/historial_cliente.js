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
    historialCliente.cierre = req.body.cierre
    historialCliente.entrega = req.body.entrega
    historialCliente.cliente = req.body.cliente
    historialCliente.pendiente = Number(req.body.pendiente)
    

	historialCliente.save((err,historialClienteStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(historialClienteStored)		

	})

}



module.exports = {
	getHistorialCliente,
	storeHistorialCliente,
	getHistorialClienteFechas
}