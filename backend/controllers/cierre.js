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

function storeCierre(req,res){
	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let cierre = new Cierre()
	let cliente = new Cliente()
    cierre.cliente = req.body.cliente
    cierre.fecha_cierre = new Date, 'dd/MM/yyyy'
    cierre.fecha_entrega = req.body.fecha_entrega
    cierre.cantidad = req.body.cantidad
    cierre.precio = req.body.precio
    cierre.total = req.body.cantidad * req.body.precio
    cierre.monto_pagado = req.body.monto_pagado
    cierre.status = 'Abierto'

    Cliente.findById(req.body.cliente,function(err,cliente){
    	console.log('Cliente += cerrado: '+req.body.cantidad);
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
	// let update = req.body
	//   	update.total = update.cantidad * update.precio
	//   	update.cliente = req.body.cliente
	//   	update.cantidad = req.body.cantidad
	  	Cierre.findById(cierreId,function(err,cierre){

	  		//console.log('cliente recibido por parametro'+req.body.cliente);
	  		//console.log('cliente del cierre'+cierre.cliente);
			if (req.body.cliente != cierre.cliente){
			 	//console.log("cambiaste al cliente");
							//cierre.proveedor.cerrado -= cierre.cantidad;
					Cliente.findById(cierre.cliente,function(err,cliente){
								//console.log('cliente viejo'+cliente);
			  			cliente.cerrado -= cierre.cantidad;		    
						cliente.save();
			  		});
			  		Cliente.findById(req.body.cliente,function(err,cliente2){
			  				//console.log('cliente viejo'+cliente);
			  			cliente2.cerrado += cierre.cantidad;		    
						cliente2.save();
			  		});

			  	cierre.cliente = req.body.cliente
			  	cierre.fecha_entrega = req.body.fecha_entrega
    			cierre.cantidad = req.body.cantidad
    			cierre.precio = req.body.precio
    			cierre.total = req.body.precio * req.body.cantidad
    			cierre.save();

				// Cierre.findByIdAndUpdate(cierreId,update,{new: true},(err,cierreUpdated)=>{
				// 	if(err) return res.status(500).send({message:`Error al actualizar el cierre: ${ err }`})
				// 	res.status(200).send(cierreUpdated)
			 // 	});
							
			}else{
    	

     	//console.log("se mantiene el cliente");

		// 	// console.log('cantidad anterior'+cierre.cantidad);		
  		Cliente.findById(req.body.cliente,function(err,cliente){	  		
			cliente.cerrado -= cierre.cantidad;		    
			cliente.save();
    		cliente.cerrado += parseFloat(req.body.cantidad);
    		cliente.save();
    			cierre.fecha_entrega = req.body.fecha_entrega
    			cierre.cliente = req.body.cliente
    			cierre.cantidad = req.body.cantidad
    			cierre.precio = req.body.precio
    			cierre.total = req.body.precio * req.body.cantidad
    			cierre.save();
  // //   			//console.log('Cliente nuevo'+cliente);
  // //   			//console.log('Cliente viejo'+cierre.cliente);
    			// Cierre.findByIdAndUpdate(cierreId,update,{new: true},(err,cierreUpdated)=>{
					// if(err) return res.status(500).send({message:`Error al actualizar el cierre: ${ err }`})
					// res.status(200).send(cierreUpdated)
    			// });
    			
		})
	
    }
    
});
    	//console.log('cantidad nueva'+req.body.cantidad);
}

function deleteCierre(req,res){
	let cierreId = req.params.id
	console.log(cierreId);

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
	getCierresCliente,
	storeCierre,
	updateCierre,
	deleteCierre
}
