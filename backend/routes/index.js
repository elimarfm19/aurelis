'use strict'

const express = require('express')
const ProductController = require('../controllers/product')
var cors = require('cors')
const api = express.Router()

api.options('/products/:id', cors())
api.options('/products/', cors())
api.get('/products',cors(),ProductController.getProducts)

api.get('/products/:id',cors(),ProductController.getProduct)

api.post('/products',cors(),ProductController.storeProduct)

api.put('/products/:id',cors(),ProductController.updateProduct)

api.delete('/products/:id',cors(),ProductController.deleteProduct)

module.exports = api