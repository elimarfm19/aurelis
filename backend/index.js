'use strict';


const mongoose = require('mongoose')
const app = require('./app') 
const config = require('./config')


mongoose.connect(config.db,(err,res)=>{
	if (err){
		return console.log(`Error al conectar a la base de datos: ${err}`)
	}
	console.log('conexion a la base de datos establecida')

	app.listen(config.port, ()=> {
		console.log(`Api Rest Corriendo: ${config.port}`)
	})

})



/*app.get('/hola/:name',(req,res)=>{
	res.send({ 
		message:`Hola ${req.params.name}`
	})
})
app.get('/products/:id',(req,res)=>{
 let productId = req.params.id
 Product.findById(productId,(err,product)=>{
 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
 	if(!product) return res.status(404).send({message:'el producto no existe'})
 	res.status(200).send({product:product})
 })
})*/

