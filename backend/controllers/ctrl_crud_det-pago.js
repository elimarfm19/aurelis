'use strict'

const DetPago = require('../models/mod_det-pago')
 
 function getdetPago(req,res){

	let detPagoId = req.params.id

	DetPago.findById(detPagoId,(err,detPago)=>{
	 	if(err) return res.status(500).send({message:'Error al realizar la peticion: ${ err }'})
	 	if(!detPago) return res.status(404).send({message:'El Pago no existe'})
	 	
	 	res.status(200).send({detPago:detPago})
	})
}

function getdetPagos(req,res){
	DetPago.find({},(err,detPago)=>{
 	if(err) return res.status(500).send({message:'Error al realizar la peticion: ${ err }'})
 	if(!detPago) return res.status(404).send({message:'No hay registros de Pagos'})
 	
 	res.status(200).send({detPago:detPago})
 	})
}

function storedetPago(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let detPago = new DetPago()

    detPago.status = req.body.status
    detPago.ref = req.body.ref
    detPago.banco = req.body.banco
    detPago.titular = req.body.titular
    detPago.monto = req.body.monto

	detPago.save((err,detPagoStored)=>{

		if (err) res.status(500).send({message:'Error al guardar en la base de datos: ${ err }'})
		
		
		res.status(200).send({detPago:detPagoStored})		

	})

}

function updatedetPago(req,res){
	let detPagoId = req.params.id
	let update = req.body

		DetPago.findByIdAndUpdate(detPagoId,update,(err,detPagoUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar el detalle de pago: ${ err }'})
			
			res.status(200).send({detPago:detPagoUpdated})
			
		})

}

function deletedetPago(req,res){
	let detPagoId = req.params.id

	DetPago.findById(detPagoId,(err,detPago)=>{
		if(err) return res.status(500).send({message:'Error al borrar el detalle de pago: ${ err }'})
		if(!detPago) return res.status(404).send({message:'el detalle de pago no existe'})

		detPago.remove(err => {
			if(err) return res.status(500).send({message:'Error al borrar el detalle de pago: ${ err }'})
			res.status(200).send({message:'el detalle de pago ha sido eliminado'})
		})
	})
}

module.exports = {
	getdetPago,
	getdetPagos,
	storedetPago,
	updatedetPago,
	deletedetPago
}
