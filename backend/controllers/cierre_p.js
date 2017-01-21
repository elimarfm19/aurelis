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
	let proveedor = new Proveedor()
    cierre.proveedor = req.body.proveedor
    cierre.fecha_cierre = new Date, 'dd/MM/yyyy'
    cierre.fecha_entrega = req.body.fecha_entrega
    cierre.cantidad = req.body.cantidad
    cierre.precio = req.body.precio
    cierre.total = req.body.cantidad * req.body.precio
    cierre.monto_pagado = req.body.monto_pagado
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
	  	Cierre_p.findById(cierreId,function(err,cierre){	  		
			console.log('cantidad anterior'+cierre.cantidad);		
    		Proveedor.findById(req.body.proveedor,function(err,proveedor){	  		
				proveedor.cerrado -= cierre.cantidad;		    
				proveedor.save();
    			proveedor.cerrado += parseFloat(req.body.cantidad);
    			proveedor.save();
    			cierre.cantidad = req.body.cantidad
    			cierre.precio = req.body.precio
    			cierre.total = req.body.precio * req.body.cantidad
    			cierre.save();
    			console.log('Proveedor nuevo'+proveedor);
    			console.log('Proveedor viejo'+cierre.proveedor);

    			if (req.body.proveedor._id != cierre.proveedor){
    				cierre.proveedor.cerrado -= cierre.cantidad;
    				Proveedor.findById(cierre.proveedor,function(err,proveedor){
    					console.log('Proveedor viejo'+proveedor);
    					proveedor.cerrado -= cierre.cantidad;		    
						proveedor.save();
    				});	    
					//cierre.proveedor.save();
					cierre.proveedor =proveedor._id;
					proveedor.cerrado += parseFloat(req.body.cantidad);
    				proveedor.save();    				
    			}

    			Cierre_p.findByIdAndUpdate(cierreId,update,{new: true},(err,cierreUpdated)=>{
					if(err) return res.status(500).send({message:`Error al actualizar el cierre: ${ err }`})
					res.status(200).send(cierreUpdated)
    			});
		})
});
    	console.log('cantidad nueva'+req.body.cantidad);
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
