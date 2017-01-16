'use strict'

const Cierre_p = require('../models/cierre_p')
const Proveedor = require('../models/proveedor')

 function getCierreP(req,res){

	let cierreId = req.params.id

	Cierre_p.findById(cierreId,(err,cierre_p)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!cierre_p) return res.status(404).send({message:'El cierre no existe'})
	 	
	 	res.status(200).send(cierre_p)
	})
}

function getCierresP(req,res){
	Cierre_p.find({},(err,cierres)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(cierres == "") return res.status(404).send({message:'No hay registros de Cierres'})
 	
 	Proveedor.populate(cierres, {path: "proveedor"},function(err, cierres){
            res.status(200).send(cierres);
        }); 

 	})
}
function getCierresProveedor(req,res){

	let ProveedorId = req.params.id

	Cierre_p.find({proveedor:ProveedorId},(err,cierres)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(cierres == "") return res.status(404).send({message:'No hay registros de Cierres'})
 	
 	Proveedor.populate(cierres, {path: "proveedor"},function(err, cierres){
            res.status(200).send(cierres);
        }); 

 	})
}

function storeCierreP(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let cierre = new Cierre_p()
    cierre.proveedor = req.body.proveedor
    cierre.fecha_cierre = new Date, 'dd/MM/yyyy'
    cierre.fecha_entrega = req.body.fecha_entrega
    cierre.cantidad = req.body.cantidad
    cierre.precio = req.body.precio
    cierre.total = req.body.cantidad * req.body.precio
    cierre.monto_pagado = req.body.monto_pagado
    cierre.status = 'Abierto'

	cierre.save((err,cierreStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(cierreStored)		

	})

}

function updateCierreP(req,res){
	let cierreId = req.params.id
	let update = req.body
	  	update.total = update.cantidad * update.precio
	  	update.proveedor = update.proveedor

	  	Cierre_p.findByIdAndUpdate(cierreId,update,{new: true},(err,cierreUpdated)=>{
			if(err) return res.status(500).send({message:`Error al actualizar el cierre: ${ err }`})
			
			res.status(200).send(cierreUpdated)
			
		})

}

function deleteCierreP(req,res){
	let cierreId = req.params.id

	Cierre_p.findById(cierreId,(err,cierre)=>{
		if(err) return res.status(500).send({message:`Error al borrar el cierre: ${ err }`})
		if(!cierre) return res.status(404).send({message:'el cierre no existe'})

		Cierre_p.remove(err => {
			if(err) return res.status(500).send({message:`Error al borrar el cierre: ${ err }`})
			res.status(200).send({message:'el cierre ha sido eliminado'})
		})
	})
}


module.exports = {
	getCierreP,
	getCierresP,
	getCierresProveedor,
	storeCierreP,
	updateCierreP,
	deleteCierreP
}
