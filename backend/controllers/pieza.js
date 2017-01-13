'use strict'

const Pieza = require('../models/pieza')
 
 function getPieza(req,res){

	let piezaId = req.params.id

	Pieza.findById(piezaId,(err,pago)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!pieza) return res.status(404).send({message:'La pieza no existe'})
	 	
	 	res.status(200).send(pieza)
	})
}

function getPiezas(req,res){
	Pieza.find({},(err,pieza)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(pieza == "") return res.status(404).send({message:'No hay registros de piezas'})
 	
 	res.status(200).send(pieza)
 	})
}

function storePieza(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let pieza = new Pieza()

    pieza.pieza = req.body.cod_proveedor
    pieza.status = req.body.status
    pieza.peso_bruto = req.body.peso_bruto
    pieza.ley = req.body.ley
    pieza.puro = req.body.puro
    pieza.peso_entrega = req.body.peso_entrega
    pieza.ajuste = req.body.ajuste

	pieza.save((err,piezaStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(piezaStored)		

	})

}

function updatePieza(req,res){
	let piezaId = req.params.id
	let update = req.body

		Pieza.findByIdAndUpdate(piezaId,update,(err,piezaUpdated)=>{
			if(err) return res.status(500).send({message:`Error al actualizar la pieza: ${ err }`})
			
			res.status(200).send(piezaUpdated)
			
		})

}

function deletePieza(req,res){
	let piezaId = req.params.id

	Pieza.findById(piezaId,(err,pieza)=>{
		if(err) return res.status(500).send({message:`Error al borrar la pieza: ${ err }`})
		if(!pieza) return res.status(404).send({message:'la pieza no existe'})

		pieza.remove(err => {
			if(err) return res.status(500).send({message:`Error al borrar la pieza: ${ err }`})
			res.status(200).send({message:'la pieza ha sido eliminada'})
		})
	})
}

module.exports = {
	getPieza,
	getPiezas,
	storePieza,
	updatePieza,
	deletePieza
}