'use strict'

const Pago = require('../models/mod_pago')
 
 function getPago(req,res){

	let pagoId = req.params.id

	Pago.findById(pagoId,(err,pago)=>{
	 	if(err) return res.status(500).send({message:'Error al realizar la peticion: ${ err }'})
	 	if(!pago) return res.status(404).send({message:'El pago no existe'})
	 	
	 	res.status(200).send({pago:pago})
	})
}

function getPagos(req,res){
	Pago.find({},(err,pago)=>{
 	if(err) return res.status(500).send({message:'Error al realizar la peticion: ${ err }'})
 	if(!pago) return res.status(404).send({message:'No hay registros de pagos'})
 	
 	res.status(200).send({pago:pago})
 	})
}

function storePago(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let pago = new Pago()

    pago.cod_cierre = req.body.cod_cierre
    pago.fecha = req.body.fecha
    pago.monto_pagado = req.body.monto_pagado

	pago.save((err,pagoStored)=>{

		if (err) res.status(500).send({message:'Error al guardar en la base de datos: ${ err }'})
		
		
		res.status(200).send({pago:pagoStored})		

	})

}

function updatePago(req,res){
	let pagoId = req.params.id
	let update = req.body

		Pago.findByIdAndUpdate(pagoId,update,(err,pagoUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar el pago: ${ err }'})
			
			res.status(200).send({pago:pagoUpdated})
			
		})

}

function deletePago(req,res){
	let pagoId = req.params.id

	Pago.findById(pagoId,(err,pago)=>{
		if(err) return res.status(500).send({message:'Error al borrar el pago: ${ err }'})
		if(!pago) return res.status(404).send({message:'el pago no existe'})

		pago.remove(err => {
			if(err) return res.status(500).send({message:'Error al borrar el pago: ${ err }'})
			res.status(200).send({message:'el pago ha sido eliminado'})
		})
	})
}

module.exports = {
	getPago,
	getPagos,
	storePago,
	updatePago,
	deletePago
}
