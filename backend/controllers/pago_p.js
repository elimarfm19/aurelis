'use strict'

const PagoProveedor = require('../models/pago_p')
const CierreProveedor = require('../models/cierre_p')
const Proveedor = require('../models/proveedor')

 function getPagoP(req,res){

	let pago_pId = req.params.id

	PagoProveedor.findById(pago_pId,(err,pago_p)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!pago_p) return res.status(404).send({message:'El pago no existe'})
	 	
	 	res.status(200).send(pago_p)
	})
}

function getPagosP(req,res){

	PagoProveedor.find({}).populate({
		path: 'cierre_p',
		model: 'CierreProveedor',
		populate: {
			path: 'proveedor',
			model: 'Proveedor'
		}
	}).exec(function(err,pagos_p){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
			if(pagos_p == "") return res.status(404).send({message:'No hay registros de pagos'})
				res.status(200).send(pagos_p);
		});
}
function getPagosCierreP(req,res){

	let CierreId = req.params.id

	PagoProveedor.find({cierre_p:CierreId}).populate({
		path: 'cierre_p',
		model: 'CierreProveedor',
		populate: {
			path: 'proveedor',
			model: 'Proveedor'
		}
	}).exec(function(err,pagos){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
			if(pagos_p == "") return res.status(404).send({message:'No hay registros de pagos'})
				res.status(200).send(pagos_p);
		});
}

function storePagoP(req,res){
	//console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let pago_p = new PagoProveedor()

    pago_p.cierre_p = req.body.cierre_p
    pago_p.fecha = req.body.fecha
    pago_p.referencia = req.body.referencia
    pago_p.titular = req.body.titular
    pago_p.banco = req.body.banco
    pago_p.monto_pagado = req.body.monto_pagado

	pago_p.save((err,pagoStoredP)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(pagoStoredP)		

	})

}

function updatePagoP(req,res){
	let pago_pId = req.params.id
	let update = req.body

		PagoProveedor.findByIdAndUpdate(pago_pId,update,(err,pagoUpdatedP)=>{
			if(err) return res.status(500).send({message:`Error al actualizar el pago: ${ err }`})
			
			res.status(200).send(pagoUpdatedP)
			
		})

}

function deletePagoP(req,res){
	let pago_pId = req.params.id

	PagoProveedor.findById(pago_pId,(err,pago_p)=>{
		if(err) return res.status(500).send({message:`Error al borrar el pago: ${ err }`})
		if(!pago_p) return res.status(404).send({message:'el pago no existe'})

		pago_p.remove(err => {
			if(err) return res.status(500).send({message:`Error al borrar el pago: ${ err }`})
			res.status(200).send({message:'el pago ha sido eliminado'})
		})
	})
}

module.exports = {
	getPagoP,
	getPagosP,
	getPagosCierreP,
	storePagoP,
	updatePagoP,
	deletePagoP
}
