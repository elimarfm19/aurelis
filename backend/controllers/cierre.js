'use strict'

const Cierre = require('../models/cierre')
const Cliente = require('../models/cliente')

 function getCierre(req,res){

	let cierreId = req.params.id

	Cierre.findById(cierreId,(err,cierre)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!cierre) return res.status(404).send({message:'El cierre no existe'})
	 	
	 	
	 		
	 	res.status(200).send(cierre);
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
function getCierresCliente(req,res){

	let ClienteId = req.params.id

	Cierre.find({cliente:ClienteId},(err,cierres)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(cierres == "") return res.status(404).send({message:'No hay registros de Cierres'})
 	
 	Cliente.populate(cierres, {path: "cliente"},function(err, cierres){
            res.status(200).send(cierres);
        }); 

 	})
}
function getCierresFechas(req,res){

	//let ClienteId = req.params.id
	let FechaInicio = req.params.fechai
	let FechaFin = req.params.fechaf


	Cierre.find({"fecha_cierre" : {"$gte" : FechaInicio, "$lte" : FechaFin}},(err,cierres)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(cierres== "") return res.status(404).send({message:'No hay registros de cierres para este cliente'})
 	
 	Cliente.populate(cierres, {path: "cliente"},function(err, cierres){
            res.status(200).send(cierres);
        }); 

 	})
}
function getCierresClienteFechas(req,res){

	let ClienteId = req.params.id
	let FechaInicio = req.params.fechai
	let FechaFin = req.params.fechaf


	Cierre.find({"fecha_cierre" : {"$gte" : FechaInicio, "$lte" : FechaFin}, "cliente": ClienteId},(err,cierres)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(cierres== "") return res.status(404).send({message:'No hay registros de cierres para este cliente'})
 	
 	Cliente.populate(cierres, {path: "cliente"},function(err, cierres){
            res.status(200).send(cierres);
        }); 

 	})
}

function storeCierre(req,res){
	//console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let cierre = new Cierre()
	let cliente = new Cliente()
    cierre.cliente = req.body.cliente
    cierre.fecha_cierre = req.body.fecha_cierre
    cierre.fecha_entrega = req.body.fecha_entrega
    cierre.cantidad = req.body.cantidad
    cierre.precio = req.body.precio
    cierre.total = req.body.cantidad * req.body.precio
    cierre.observacion = req.body.observacion
    cierre.ganancia = 0
    cierre.saldo = 0
    cierre.status = 'Abierto'

    Cliente.findById(req.body.cliente,function(err,cliente){
    	// console.log('Cliente += cerrado: '+req.body.cantidad);
    	cliente.cerrado += parseFloat(req.body.cantidad);  
    	cliente.save();
    });

	cierre.save((err,cierreStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
				
		res.status(200).send(cierreStored)		

	})

}

function updateCierre(req,res){

	let cierreId = req.params.id
	let update = req.body
	  	update.total = update.cantidad * update.precio
	  	update.cliente = req.body.cliente
	  	update.cantidad = req.body.cantidad
	  	update.precio = req.body.precio
	  	update.fecha_entrega = req.body.fecha_entrega
	  	update.fecha_cierre = req.body.fecha_cierre
	  	update.ganancia = req.body.ganancia
	  	update.saldo = req.body.saldo
	  	update.observacion = req.body.observacion


	  //	console.log(update.precio);
// 	  	Cierre.findById(cierreId,function(err,cierre){
// 	  		Cliente.findById(cierre.cliente._id,function(err,cliente){	  		
// 				cliente.cerrado -= cierre.cantidad;		    
// 				cliente.save();
// 	    		cliente.cerrado += parseFloat(req.body.cantidad);
// 	    		cliente.save();
// 	    			Cierre.findByIdAndUpdate(cierreId,update,{new: true},(err,cierreUpdated)=>{
// 						if(err) return res.status(500).send({message:`Error al actualizar el cierre: ${ err }`})
// 						res.status(200).send(cierreUpdated)
// 	    			});
	    			
// 			})

// });
Cierre.findByIdAndUpdate(cierreId,update,{new: true},(err,cierreUpdated)=>{
						if(err) return res.status(500).send({message:`Error al actualizar el cierre: ${ err }`})
						res.status(200).send(cierreUpdated)
	    			});
    	//console.log('cantidad nueva'+req.body.cantidad);
}

function deleteCierre(req,res){
	let cierreId = req.params.id
	let cliente = req.params.id
	//console.log(cierreId);

	Cierre.findById(cierreId,(err,cierre)=>{

		Cliente.findById(cierre.cliente,function(err,cliente){
			console.log(cierre.cantidad);
			cliente.cerrado -= cierre.cantidad;		    
			cliente.save();
		})

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
	getCierresCliente,
	getCierresFechas,
	getCierresClienteFechas,
	storeCierre,
	updateCierre,
	deleteCierre
}
