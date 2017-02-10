'use strict'

const Pieza = require('../models/pieza')
const Recepcion = require('../models/recepcion')
const Entrega = require('../models/entrega')
const Proveedor = require('../models/proveedor')

 function getPieza(req,res){

	let piezaId = req.params.id

	Pieza.findById(piezaId,(err,pieza)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!pieza) return res.status(404).send({message:'La pieza no existe'})
	 	
	 	res.status(200).send(pieza)
	})
}

function getPiezas(req,res){
	Pieza.find({})
	.populate({
		path: 'recepcion',
		model: 'Recepcion',
		populate: {

			path: 'cierre_p proveedor',
			//model: 'CierreProveedor Proveedor',
			populate: {
			path: 'proveedor',
			model: 'Proveedor'
			}
		}
	}).populate({
		path: 'entrega',
		model: 'Entrega',
		populate: {

			path: 'cliente',
			model: 'Cliente'
		}
	})
	.exec(function(err,piezas){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
			if(piezas == "") return res.status(404).send({message:'No hay registros de piezas'})
				res.status(200).send(piezas);
		});
}

function storePieza(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let pieza = new Pieza()

    pieza.cod_pieza = req.body.cod_pieza
	pieza.cod_proveedor = req.body.cod_proveedor
    pieza.status = 'Disponible'
    pieza.peso_bruto = req.body.peso_bruto
    pieza.ley = req.body.ley
	pieza.puro_p = parseFloat(req.body.peso_bruto * (req.body.ley / 1000)).toFixed(2)
	pieza.puro_c = parseFloat(req.body.peso_entrega * (req.body.ley / 1000)).toFixed(2)
    pieza.peso_entrega = req.body.peso_entrega
	pieza.observacion = req.body.observacion
    pieza.ajuste = req.body.ajuste
    pieza.recepcion = req.body.recepcion 
    pieza.entrega = null;  
	pieza.save((err,piezaStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(piezaStored)		

	})

}

function updatePieza(req,res){
	let piezaId = req.params.id
	let puroViejoP;
	let update = req.body

		console.log(update.puro_c);
		console.log(update.puro_p);

		// Pieza.findById(piezaId,(err,pieza)=>{

			if (pieza.ley!=update.ley){				
				//pieza.recepcion.proveedor.entregado-= pieza.puro_p;
				//pieza.entrega.cliente.entregado-=pieza.puro_c;				
				pieza.puro_p = parseFloat(pieza.peso_bruto*(req.body.ley/1000)).toFixed(2);
				console.log(req.body.ley);
				pieza.puro_c = parseFloat(pieza.peso_entrega*(req.body.ley/1000)).toFixed(2);		
				//pieza.recepcion.proveedor.entregado+= pieza.puro_p;
				//pieza.entrega.cliente.entregado+=pieza.puro_c;				
			}
			if (pieza.peso_entrega!=update.peso_entrega){
				//pieza.entrega.cliente.entregado-= pieza.puro_c;				
				pieza.puro_p= parseFloat(update.peso_entrega*(pieza.ley/1000)).toFixed(2);
				//pieza.entrega.cliente.entregado+= pieza.puro_c;
			}
		})

		//update.puro = parseFloat(update.peso_entrega * (update.ley/1000)).toFixed(2);
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
