'use strict'

const Proveedor = require('../models/persona')
 
 function getProveedor(req,res){

	let proveedorId = req.params.id

	Proveedor.findById(proveedorId,(err,proveedor)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!proveedor) return res.status(404).send({message:'El proveedor no existe'})
	 	
	 	res.status(200).send(proveedor)
	})
}

function getProveedores(req,res){
	Proveedor.find({},(err,proveedores)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(proveedores == "") return res.status(404).send({message:'No hay registros de Proveedores'})
 	
 	res.status(200).send(proveedores)
 	})
}

function storeProveedor(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let proveedor = new Proveedor()

    proveedor.nombres = req.body.nombres
    proveedor.apellidos = req.body.apellidos
	proveedor.nacionalidad = req.body.nacionalidad
    proveedor.ced_rif = req.body.ced_rif
    proveedor.tlf = req.body.tlf
    proveedor.direccion = req.body.direccion
    proveedor.email = req.body.email

	proveedor.save((err,proveedorStored)=>{

		if (err) res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
		
		
		res.status(200).send(proveedorStored)		

	})

}

function updateProveedor(req,res){
	let proveedorId = req.params.id
	let update = req.body

		Proveedor.findByIdAndUpdate(proveedorId,update,(err,proveedorUpdated)=>{
			if(err) return res.status(500).send({message:`Error al actualizar el proveedor: ${ err }`})
			
			res.status(200).send(proveedorUpdated)
			
		})

}

function deleteProveedor(req,res){
	let proveedorId = req.params.id

	Proveedor.findById(proveedorId,(err,proveedor)=>{
		if(err) return res.status(500).send({message:`Error al borrar el proveedor: ${ err }`})
		if(!proveedor) return res.status(404).send({message:'el proveedor no existe'})

		proveedor.remove(err => {
			if(err) return res.status(500).send({message:`Error al borrar el proveedor: ${ err }`})
			res.status(200).send({message:'el proveedor ha sido eliminado'})
		})
	})
}

module.exports = {
	getProveedor,
	getProveedores,
	storeProveedor,
	updateProveedor,
	deleteProveedor
}
