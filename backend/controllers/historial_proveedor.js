'use strict';

const HistorialProveedor = require('../models/historial_proveedor')
const CierreProveedor = require('../models/cierre_p')
const Recepcion = require('../models/recepcion')
const Proveedor = require('../models/proveedor')

function getHistorialProveedor(req,res){
	

	let proveedorId = req.params.id

	HistorialProveedor.find({ proveedor:proveedorId }).sort( { _id:+1 } )
	.populate({
		path: 'cierre',
		model: 'CierreProveedor'
		
	}).populate({
		path: 'proveedor',
		model: 'Proveedor'
	}).populate({
		path: 'recepcion',
		model: 'Recepcion'
	})
	.exec(function(err,historiales){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!historiales) return res.status(404).send({message:'el Proveedor no posee Historial'})
	 	res.status(200).send(historiales)
	});

	// HistorialCliente.find({ cliente:clienteId },(err,historiales)=>{
	//  	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	//  	if(!historiales) return res.status(404).send({message:'el Cliente no posee Hstorial'})
	 	
	//  	res.status(200).send(historiales)
	// })
}
function getHistorialProveedorFechas(req,res){
	

	let proveedorId = req.params.id
	let FechaInicio = req.params.fechai
	let FechaFin = req.params.fechaf

	HistorialProveedor.find({"fecha" : {"$gte" : FechaInicio, "$lte" : FechaFin}, "proveedor": proveedorId}).sort( { _id:+1 } )
	.populate({
		path: 'cierre',
		model: 'CierreProveedor'
		
	}).populate({
		path: 'proveedor',
		model: 'Proveedor'
	}).populate({
		path: 'recepcion',
		model: 'Recepcion'
	})
	.exec(function(err,historiales){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!historiales) return res.status(404).send({message:'el Proveedor no posee Historial'})
	 	res.status(200).send(historiales)
	});

	// HistorialCliente.find({ cliente:clienteId },(err,historiales)=>{
	//  	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	//  	if(!historiales) return res.status(404).send({message:'el Cliente no posee Hstorial'})
	 	
	//  	res.status(200).send(historiales)
	// })
}
function storeHistorialProveedor(req,res){
	
	let historialProveedor = new HistorialProveedor()

    historialProveedor.fecha = req.body.fecha
    historialProveedor.cierre = req.body.cierre
    historialProveedor.recepcion = req.body.recepcion
    historialProveedor.proveedor = req.body.proveedor
    historialProveedor.pendiente = Number(req.body.pendiente)
    

	historialProveedor.save((err,historialProveedorStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(historialProveedorStored)		

	})

}



module.exports = {
	getHistorialProveedor,
	storeHistorialProveedor,
	getHistorialProveedorFechas
}