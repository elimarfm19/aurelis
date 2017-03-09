'use strict'

const User = require('../models/user')

 function getUser(req,res){

	let username = req.params.username
	let password = req.params.password

	User.find( { $and: [ { username: username }, { password: password } ] },(err,user)=>{
	 	if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
	 	if(user=="") return res.status(404).send({message:'El usuario no existe'})
	 	
	 	res.status(200).send(user)
	})
}

function getUsers(req,res){

	User.find({}).exec(function(err,users){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
			if(users == "") return res.status(404).send({message:'No hay registros de users'})
				res.status(200).send(users);
		});
}
function getUserId(req,res){
	let userId = req.params.id

	User.find({userId:userId}).exec(function(err,user){
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${ err }`})
			if(user == "") return res.status(404).send({message:'No hay registro de user'})
				res.status(200).send(user);
		});
}
function storeUser(req,res){
	let user = new User()

    user.username = req.body.username
    user.password = req.body.password
   

	user.save((err,userStored)=>{

		if (err) res.status(500).send({message:`Error al guardar en la base de datos: ${ err }`})
		
		
		res.status(200).send(userStored)		

	})

}

function updateUser(req,res){
	let userId = req.params.id
	let update = req.body

		User.findByIdAndUpdate(userId,update,{new: true},(err,userUpdated)=>{
			if(err) return res.status(500).send({message:`Error al actualizar el user: ${ err }`})
			
			res.status(200).send(userUpdated)
			
		})

}

function deleteUser(req,res){
	let userId = req.params.id

	User.findById(userId,(err,user)=>{
		if(err) return res.status(500).send({message:`Error al borrar el user: ${ err }`})
		if(!user) return res.status(404).send({message:'el user no existe'})

		user.remove(err => {
			if(err) return res.status(500).send({message:`Error al borrar el user: ${ err }`})
			res.status(200).send({message:'el user ha sido eliminado'})
		})
	})
}

module.exports = {
	getUser,
	getUserId,
	getUsers,
	storeUser,
	updateUser,
	deleteUser
}
