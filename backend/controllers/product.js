'use strict';

const Product = require('../models/product')

function getProduct(req,res){
	


	let productId = req.params.id

	Product.findById(productId,(err,product)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(!product) return res.status(404).send({message:'el producto no existe'})
	 	
	 	res.status(200).send(product)
	})
}

function getProducts(req,res,next){


	Product.find({},(err,products)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(!products) return res.status(404).send({message:'No hay registros de Productos'})
 	
 	res.status(200).send(products)
 	})
}

function storeProduct(req,res){
 

	console.log(req.body)
	//res.status(200).send({message:'el producto se ha recibido'})
	let product = new Product()

	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category

	product.save((err,productStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(productStored)		

	})

}
function updateProduct(req,res){

	let productId = req.params.id
	let update = req.body

		Product.findByIdAndUpdate(productId,update,(err,productUpdated)=>{
			if(err) return res.status(500).send({message:`Error al actualizar el producto: ${ err }`})
			
			res.status(200).send(productUpdated)
			
		})

}
function deleteProduct(req,res){

    
	let productId = req.params.id

	Product.findById(productId,(err,product)=>{
		if(err) return res.status(500).send({message:`Error al borrar el producto: ${ err }`})
		if(!product) return res.status(404).send({message:'el producto no existe'})

		product.remove(err => {
			if(err) return res.status(500).send({message:`Error al borrar el producto: ${ err }`})
			res.status(200).send({message:'el producto ha sido eliminado'})
		})
	})
}

module.exports = {
	getProduct,
	getProducts,
	storeProduct,
	updateProduct,
	deleteProduct
}