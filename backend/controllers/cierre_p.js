'use strict'

const Cierre_p = require('../models/cierre_p')
const Cierre = require('../models/cierre')
const Proveedor = require('../models/proveedor')

 function getCierreP(req,res){

	let cierreId = req.params.id

	Cierre_p.findById(cierreId,(err,cierre_p)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!cierre_p) return res.status(404).send({message:'El cierre no existe'})
	 	
	 	Proveedor.populate(cierre_p, {path: "proveedor"},function(err, cierre_p){
            res.status(200).send(cierre_p);
        }); 
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
function getCierresProveedorCierres(req,res){

	let CierreId = req.params.id
	Cierre_p.find({ cierre: CierreId})
	.populate({
		path: 'cierre',
		model: 'Cierre',
		populate: {

			path: 'cliente',
			model: 'Cliente',
			// populate: {
			// path: 'proveedor',
			// model: 'Proveedor'
			// }
		}
	}).populate({
		path: 'proveedor',
		model: 'Proveedor',
		// populate: {

		// 	path: 'cliente',
		// 	model: 'Cliente'
		// }
	})
	.exec(function(err,CierresProveedor){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
			if(CierresProveedor == "") return res.status(404).send({message:'Los CierresProveedor no Existen'})
				res.status(200).send(CierresProveedor);
		});
	// Cierre_p.find({cierre:CierreId},(err,cierres)=>{
 // 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 // 	if(cierres == "") return res.status(404).send({message:'No hay registros de Cierres'})
 	
 // 	Proveedor.populate(cierres, {path: "proveedor"},function(err, cierres){
 //            res.status(200).send(cierres);
 //        }); 

 // 	})
}
function getCierresProveedorFechas(req,res){

	let ProveedorId = req.params.id
	let FechaInicio = req.params.fechai
	let FechaFin = req.params.fechaf


	Cierre_p.find({"fecha_cierre" : {"$gte" : FechaInicio, "$lte" : FechaFin}, "proveedor": ProveedorId},(err,cierres)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(cierres== "") return res.status(404).send({message:'No hay registros de cierres para este proveedor'})
 	
 	Proveedor.populate(cierres, {path: "proveedor"},function(err, cierres){
            res.status(200).send(cierres);
        }); 

 	})
}

function storeCierreP(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let cierre = new Cierre_p()
	let proveedor = new Proveedor()
    cierre.proveedor = req.body.proveedor
    cierre.fecha_cierre = req.body.fecha_cierre
    cierre.fecha_entrega = req.body.fecha_entrega
    cierre.cantidad = req.body.cantidad
    cierre.precio = req.body.precio
    cierre.total = req.body.cantidad * req.body.precio
    cierre.monto_pagado = req.body.monto_pagado
    cierre.cierre = req.body.cierre
    cierre.status = 'Abierto'

    Proveedor.findById(req.body.proveedor,function(err,proveedor){

    	proveedor.cerrado += parseFloat(req.body.cantidad);  
    	proveedor.save();
    }); 

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
	  	update.cantidad = req.body.cantidad
	  	update.precio = req.body.precio
	  	update.fecha_entrega = req.body.fecha_entrega
	  	Cierre_p.findById(cierreId,function(err,cierre){	  		
			console.log('cantidad anterior'+cierre.cantidad);		
    		
    		Proveedor.findById(req.body.proveedor,function(err,proveedor){	  		
				proveedor.cerrado -= cierre.cantidad;		    
				proveedor.save();
    			proveedor.cerrado += parseFloat(req.body.cantidad);
    			proveedor.save();
    			// cierre.cantidad = req.body.cantidad
    			// cierre.precio = req.body.precio
    			// cierre.total = req.body.precio * req.body.cantidad
    			// cierre.save();
    			// console.log('Proveedor nuevo'+proveedor);
    			// console.log('Proveedor viejo'+cierre.proveedor);

    	// 		if (req.body.proveedor._id != cierre.proveedor){
    	// 			cierre.proveedor.cerrado -= cierre.cantidad;
    	// 			Proveedor.findById(cierre.proveedor,function(err,proveedor){
    	// 				console.log('Proveedor viejo'+proveedor);
    	// 				proveedor.cerrado -= cierre.cantidad;		    
					// 	proveedor.save();
    	// 			});	    
					// //cierre.proveedor.save();
					// cierre.proveedor =proveedor._id;
					// proveedor.cerrado += parseFloat(req.body.cantidad);
    	// 			proveedor.save();    				
    	// 		}

    			Cierre_p.findByIdAndUpdate(cierreId,update,{new: true},(err,cierreUpdated)=>{
					if(err) return res.status(500).send({message:`Error al actualizar el cierre: ${ err }`})
					res.status(200).send(cierreUpdated)
    			});
		})
});
    	console.log('cantidad nueva'+req.body.cantidad);
}

function deleteCierreP(req,res){
	let cierre_pId = req.params.id
	let proveedor = req.params.id

	Cierre_p.findById(cierre_pId,(err,cierre_p)=>{

		Proveedor.findById(cierre_p.proveedor,function(err,proveedor){
			proveedor.cerrado -= cierre_p.cantidad;
			proveedor.save();
		})

		// if(err) return res.status(500).send({message:`Error al borrar el cierre: ${ err }`})
		// if(!cierre_p) return res.status(404).send({message:'el cierre no existe'})

		cierre_p.remove(err => {
			if(err) return res.status(500).send({message:`Error al borrar el cierre: ${ err }`})
			res.status(200).send({message:'el cierre ha sido eliminado'})
		})
	})
}


module.exports = {
	getCierreP,
	getCierresP,
	getCierresProveedor,
	getCierresProveedorFechas,
	getCierresProveedorCierres,
	storeCierreP,
	updateCierreP,
	deleteCierreP
}
