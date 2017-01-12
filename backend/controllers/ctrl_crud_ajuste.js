'use strict'

const Ajuste = require('../models/mod_ajuste')
 
 function getAjuste(req,res){

	let ajusteId = req.params.id

	Ajuste.findById(ajusteId,(err,ajuste)=>{
	 	if(err) return res.status(500).send({message:'Error al realizar la peticion: ${ err }'})
	 	if(!ajuste) return res.status(404).send({message:'El ajuste no existe'})
	 	
	 	res.status(200).send({ajuste:ajuste})
	})
}

function getAjustes(req,res){
	Ajuste.find({},(err,ajuste)=>{
 	if(err) return res.status(500).send({message:'Error al realizar la peticion: ${ err }'})
 	if(!ajuste) return res.status(404).send({message:'No hay registros de Ajustes'})
 	
 	res.status(200).send({ajuste:ajuste})
 	})
}

function storeAjuste(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let ajuste = new Ajuste()

    ajuste.cod_pieza = req.body.cod_pieza
    ajuste.cod_entrega = req.body.cod_entrega
    ajuste.fecha = req.body.fecha
    ajuste.peso_bruto = req.body.peso_bruto
    ajuste.ley = req.body.ley
    ajuste.puro = req.body.puro
    ajuste.peso_entrega = req.body.peso_entrega

	ajuste.save((err,ajusteStored)=>{

		if (err) res.status(500).send({message:'Error al guardar en la base de datos: ${ err }'})
		
		
		res.status(200).send({ajuste:ajusteStored})		

	})

}

function updateAjuste(req,res){
	let ajusteId = req.params.id
	let update = req.body

		Ajuste.findByIdAndUpdate(ajusteId,update,(err,ajusteUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar el ajuste: ${ err }'})
			
			res.status(200).send({ajuste: ajusteUpdated })
			
		})

}

function deleteAjuste(req,res){
	let ajusteId = req.params.id

	Ajuste.findById(ajusteId,(err,ajuste)=>{
		if(err) return res.status(500).send({message:'Error al borrar el ajuste: ${ err }'})
		if(!ajuste) return res.status(404).send({message:'el ajuste no existe'})

		ajuste.remove(err => {
			if(err) return res.status(500).send({message:'Error al borrar el ajuste: ${ err }'})
			res.status(200).send({message:'el ajuste ha sido eliminado'})
		})
	})
}

module.exports = {
	getAjuste,
	getAjustes,
	storeAjuste,
	updateAjuste,
	deleteAjuste
}
