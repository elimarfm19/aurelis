'use strict'

const Cierre = require('../models/cierre')
const Cliente = require('../models/cliente')

 function getCierre(req,res){

	let cierreId = req.params.id

	Cierre.findById(cierreId,(err,cierre)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!cierre) return res.status(404).send({message:'El cierre no existe'})
	 	
	 	res.status(200).send(cierre)
	})
}

function getCierres(req,res){
	Cierre.find({},(err,cierres)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(cierres == "") return res.status(404).send({message:'No hay registros de Cierres'})
 	
 	Cliente.populate(cierres, {path: "cliente"},function(err, cierres){
            res.status(200).send(cierres);
        }); 

 	})
}

function storeCierre(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let cierre = new Cierre()
    cierre.cliente = req.body.cliente
    cierre.fecha_cierre = req.body.fecha_cierre
    cierre.fecha_entrega = req.body.fecha_entrega
    cierre.cantidad = req.body.cantidad
    cierre.precio = req.body.precio
    cierre.total = req.body.cantidad * req.body.precio
    cierre.monto_pagado = req.body.monto_pagado
    cierre.status = req.body.status

	cierre.save((err,cierreStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(cierreStored)		

	})

}

function updateCierre(req,res){
	let cierreId = req.params.id
	let update = req.body
	  	update.total = update.cantidad * update.precio
	  	update.cliente = update.cliente

	  	Cierre.findByIdAndUpdate(cierreId,update,{new: true},(err,cierreUpdated)=>{
			if(err) return res.status(500).send({message:`Error al actualizar el cierre: ${ err }`})
			
			res.status(200).send(cierreUpdated)
			
		})

}

function deleteCierre(req,res){
	let cierreId = req.params.id

	Cierre.findById(cierreId,(err,cierre)=>{
		if(err) return res.status(500).send({message:`Error al borrar el cierre: ${ err }`})
		if(!cierre) return res.status(404).send({message:'el cierre no existe'})

		cierre.remove(err => {
			if(err) return res.status(500).send({message:`Error al borrar el cierre: ${ err }`})
			res.status(200).send({message:'el cierre ha sido eliminado'})
		})
	})
}

module.exports = {
	getCierre,
	getCierres,
	storeCierre,
	updateCierre,
	deleteCierre
}
