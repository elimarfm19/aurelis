'use strict'

const Cliente = require('../models/cliente')
 
 function getCliente(req,res){

	let clienteId = req.params.id

	Cliente.findById(clienteId,(err,cliente)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!cliente) return res.status(404).send({message:'El cliente no existe'})
	 	
	 	res.status(200).send(cliente)
	})
}

function getClientes(req,res){
	Cliente.find({},(err,clientes)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(clientes == "") return res.status(404).send({message:'No hay registros de Clientes'})
 	
 	res.status(200).send(clientes)
 	})
}

function storeCliente(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let cliente = new Cliente()
    
    cliente.nombres = req.body.nombres
    cliente.apellidos = req.body.apellidos	
    cliente.ced_rif = req.body.ced_rif
    cliente.nacionalidad = req.body.nacionalidad
    cliente.tlf = req.body.tlf
    cliente.direccion = req.body.direccion
    cliente.email = req.body.email
    cliente.cerrado = 0
    cliente.entregado = 0
	cliente.cerrado_m = req.body.cerrado_m
	cliente.entregado_m = req.body.entregado_m
    
	cliente.save((err,clienteStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(clienteStored)		

	})

}

function updateCliente(req,res){
	let clienteId = req.params.id
	let update = req.body
 
		Cliente.findByIdAndUpdate(clienteId,update,(err,clienteUpdated)=>{
			
			if(err) return res.status(500).send({message:`Error al actualizar el cliente: ${ err }`})
			
			res.status(200).send(clienteUpdated)
			
		})

}

function deleteCliente(req,res){
	let clienteId = req.params.id

	Cliente.findById(clienteId,(err,cliente)=>{
		if(err) return res.status(500).send({message:`Error al borrar el cliente: ${ err }`})
		if(!cliente) return res.status(404).send({message:'el cliente no existe'})

		cliente.remove(err => {
			if(err) return res.status(500).send({message:`Error al borrar el cliente: ${ err }`})
			res.status(200).send({message:'el cliente ha sido eliminado'})
		})
	})
}

module.exports = {
	getCliente,
	getClientes,
	storeCliente,
	updateCliente,
	deleteCliente
}
