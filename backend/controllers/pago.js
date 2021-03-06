'use strict'

const Pago = require('../models/pago')
const Cierre = require('../models/cierre_p')
const Proveedor = require('../models/proveedor')

 function getPago(req,res){

	let pagoId = req.params.id

	Pago.findById(pagoId,(err,pago)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!pago) return res.status(404).send({message:'El pago no existe'})
	 	
	 	res.status(200).send(pago)
	})
}

function getPagos(req,res){

	Pago.find({}).populate({
		path: 'cierre_p',
		model: 'CierreProveedor',
		populate: {
			path: 'proveedor',
			model: 'Proveedor'
		}
	}).exec(function(err,pagos){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
			if(pagos == "") return res.status(404).send({message:'No hay registros de pagos'})
				res.status(200).send(pagos);
		});
}
function getPagosCierre(req,res){

	let CierreId = req.params.id

	Pago.find({cierre_p:CierreId}).populate({
		path: 'cierre_p',
		model: 'CierreProveedor',
		populate: {
			path: 'proveedor',
			model: 'Proveedor'
		}
	}).exec(function(err,pagos){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
			if(pagos == "") return res.status(404).send({message:'No hay registros de pagos'})
				res.status(200).send(pagos);
		});
}

function storePago(req,res){
	//console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let pago = new Pago()

    pago.cierre = req.body.cierre
    //pago.fecha = req.body.fecha
    pago.ci = req.body.ci
    pago.titular = req.body.titular
    pago.banco = req.body.banco
    pago.monto_pagado = req.body.monto_pagado
    pago.cierre_p = req.body.cierre_p

	pago.save((err,pagoStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(pagoStored)		

	})

}

function updatePago(req,res){
	let pagoId = req.params.id
	let update = req.body

		Pago.findByIdAndUpdate(pagoId,update,(err,pagoUpdated)=>{
			if(err) return res.status(500).send({message:`Error al actualizar el pago: ${ err }`})
			
			res.status(200).send(pagoUpdated)
			
		})

}

function deletePago(req,res){
	let pagoId = req.params.id

	Pago.findById(pagoId,(err,pago)=>{
		if(err) return res.status(500).send({message:`Error al borrar el pago: ${ err }`})
		if(!pago) return res.status(404).send({message:'el pago no existe'})

		pago.remove(err => {
			if(err) return res.status(500).send({message:`Error al borrar el pago: ${ err }`})
			res.status(200).send({message:'el pago ha sido eliminado'})
		})
	})
}

module.exports = {
	getPago,
	getPagos,
	getPagosCierre,
	storePago,
	updatePago,
	deletePago
}
