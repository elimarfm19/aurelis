'use strict'

const express = require('express')
const ProductController = require('../controllers/product') //EJEMPLO

const clienteController = require('../controllers/cliente')
const proveedorController = require('../controllers/proveedor')
const piezaController = require('../controllers/pieza')
const recepcionController = require('../controllers/recepcion')
const pagoController = require('../controllers/pago')
const pagoControllerP = require('../controllers/pago_p')
const entregaController = require('../controllers/entrega')
const detPagoController = require('../controllers/detPago')
const detEntregaController = require('../controllers/detEntrega')
const cierreController = require('../controllers/cierre')
const cierreControllerProveedor = require('../controllers/cierre_p')
const ajusteController = require('../controllers/ajusteCierre')
const detRecepcionController = require('../controllers/detRecepcion')

var cors = require('cors')
const api = express.Router()

api.put('http://localhost:9000/', cors())
api.post('http://localhost:9000/', cors())
api.delete('http://localhost:9000/', cors())

api.options('/products/:id', cors())
api.options('/products/', cors())
api.get('/products',cors(),ProductController.getProducts)

api.get('/products/:id',cors(),ProductController.getProduct)

api.post('/products',cors(),ProductController.storeProduct)

api.put('/products/:id',cors(),ProductController.updateProduct)

api.delete('/products/:id',cors(),ProductController.deleteProduct)

// CLIENTE--------------------------------------------------------------------------
api.options('/clientes/:id', cors())
api.options('/clientes/', cors())
api.get('/clientes',cors(),clienteController.getClientes)

api.get('/clientes/:id',cors(),clienteController.getCliente)

api.post('/clientes',cors(),clienteController.storeCliente)

api.put('/clientes/:id',cors(),clienteController.updateCliente)

api.delete('/clientes/:id',cors(),clienteController.deleteCliente)

// PROVEEDOR--------------------------------------------------------------------------
api.options('/proveedores/:id', cors())
api.options('/proveedores/', cors())
api.get('/proveedores',cors(),proveedorController.getProveedores)

api.get('/proveedores/:id',cors(),proveedorController.getProveedor)

api.post('/proveedores',cors(),proveedorController.storeProveedor)

api.put('/proveedores/:id',cors(),proveedorController.updateProveedor)

api.delete('/proveedores/:id',cors(),proveedorController.deleteProveedor)

// PIEZA--------------------------------------------------------------------------
api.options('/piezas/:id', cors())
api.options('/piezas/', cors())
api.options('/piezas/entrega/:id', cors())
api.options('/piezas/recepcion/:id', cors())

api.get('/piezas',cors(),piezaController.getPiezas)

api.get('/piezas/entrega/:id',cors(),piezaController.getPiezasEntrega)

api.get('/piezas/recepcion/:id',cors(),piezaController.getPiezasRecepcion)

api.get('/piezas/:id',cors(),piezaController.getPieza)

api.post('/piezas',cors(),piezaController.storePieza)

api.put('/piezas/:id',cors(),piezaController.updatePieza)

api.delete('/piezas/:id',cors(),piezaController.deletePieza)

// ENTREGA--------------------------------------------------------------------------
api.options('/entregas/:id', cors())
api.options('/entregas/', cors())
api.options('/entregas/cierres/:id', cors())
api.get('/entregas',cors(),entregaController.getEntregas)

api.get('/entregas/:id',cors(),entregaController.getEntrega)
api.get('/entregas/cliente/:id',cors(),entregaController.getEntregasCliente)
api.get('/entregas/cliente/:id/:fechai/:fechaf',cors(),entregaController.getEntregasClienteFechas)
api.post('/entregas',cors(),entregaController.storeEntrega)

api.put('/entregas/:id',cors(),entregaController.updateEntrega)

api.delete('/entregas/:id',cors(),entregaController.deleteEntrega)

// RECEPCION--------------------------------------------------------------------------
api.options('/recepciones/:id', cors())
api.options('/recepciones/', cors())
api.options('/recepciones/cierres/:id', cors())
api.get('/recepciones',cors(),recepcionController.getRecepciones)

api.get('/recepciones/:id',cors(),recepcionController.getRecepcion)
api.get('/recepciones/proveedor/:id',cors(),recepcionController.getRecepcionesProveedor)
api.get('/recepciones/proveedor/:id/:fechai/:fechaf',cors(),recepcionController.getRecepcionesProveedorFechas)
api.post('/recepciones',cors(),recepcionController.storeRecepcion)

api.put('/recepciones/:id',cors(),recepcionController.updateRecepcion)

api.delete('/recepciones/:id',cors(),recepcionController.deleteRecepcion)

// PAGO--------------------------------------------------------------------------
api.options('/pagos/:id', cors())
api.options('/pagos/cierre/:id', cors())
api.options('/pagos/', cors())

api.get('/pagos',cors(),pagoController.getPagos)

api.get('/pagos/cierre/:id',cors(),pagoController.getPagosCierre)

api.get('/pagos/:id',cors(),pagoController.getPago)

api.post('/pagos',cors(),pagoController.storePago)

api.put('/pagos/:id',cors(),pagoController.updatePago)

api.delete('/pagos/:id',cors(),pagoController.deletePago)


// PAGO PROVEEDOR--------------------------------------------------------------------------
api.options('/pagosProveedor/:id', cors())
api.options('/pagosProveedor/', cors())
api.options('/pagosProveedor/cierre/:id', cors())

api.get('/pagosProveedor',cors(),pagoControllerP.getPagosP)
api.get('/pagosProveedor/cierre/:id',cors(),pagoControllerP.getPagosCierreP)
api.get('/pagosProveedor/:id',cors(),pagoControllerP.getPagoP)
api.post('/pagosProveedor',cors(),pagoControllerP.storePagoP)
api.put('/pagosProveedor/:id',cors(),pagoControllerP.updatePagoP)
api.delete('/pagosProveedor/:id',cors(),pagoControllerP.deletePagoP)

// DETALLE DE RECEPCION--------------------------------------------------------------------------
api.options('/detRecepciones/:id', cors())
api.options('/detRecepciones/', cors())
api.get('/detRecepciones',cors(),detRecepcionController.getdetRecepciones)

api.get('/detRecepciones/:id',cors(),detRecepcionController.getdetRecepcion)

api.post('/detRecepciones',cors(),detRecepcionController.storedetRecepcion)

api.put('/detRecepciones/:id',cors(),detRecepcionController.updatedetRecepcion)

api.delete('/detRecepciones/:id',cors(),detRecepcionController.deletedetRecepcion)

// DETALLE DE ENTREGA--------------------------------------------------------------------------
api.options('/detEntregas/:id', cors())
api.options('/detEntregas/', cors())
api.get('/detEntregas',cors(),detEntregaController.getdetEntregas)

api.get('/detEntregas/:id',cors(),detEntregaController.getdetEntrega)

api.post('/detEntregas',cors(),detEntregaController.storedetEntrega)

api.put('/detEntregas/:id',cors(),detEntregaController.updatedetEntrega)

api.delete('/detEntregas/:id',cors(),detEntregaController.deletedetEntrega)

// CIERRE--------------------------------------------------------------------------
api.options('/cierres/:id', cors())
api.options('/cierres/', cors())
api.options('/cierres/cliente/:id', cors())
api.get('/cierres',cors(),cierreController.getCierres)

api.get('/cierres/cliente/:id',cors(),cierreController.getCierresCliente)
api.get('/cierres/cliente/:id/:fechai/:fechaf',cors(),cierreController.getCierresClienteFechas)

api.get('/cierres/:id',cors(),cierreController.getCierre)

api.post('/cierres',cors(),cierreController.storeCierre)

api.put('/cierres/:id',cors(),cierreController.updateCierre)

api.delete('/cierres/:id',cors(),cierreController.deleteCierre)

// CIERRE PROVEEDOR-----------------------------------------------------------------
api.options('/cierresProveedor/:id', cors())
api.options('/cierresProveedor/', cors())
api.options('/cierresProveedor/proveedor/:id', cors())
api.options('/cierresProveedor/cierres/:id', cors())


api.get('/cierresProveedor',cors(),cierreControllerProveedor.getCierresP)
api.get('/cierresProveedor/proveedor/:id',cors(),cierreControllerProveedor.getCierresProveedor)
//api.get('/cierresProveedor/proveedor/:id',cors(),cierreControllerProveedor.getCierresProveedor)
api.get('/cierresProveedor/cierres/:id',cors(),cierreControllerProveedor.getCierresProveedorCierres)
api.get('/cierresProveedor/:id',cors(),cierreControllerProveedor.getCierreP)
api.post('/cierresProveedor',cors(),cierreControllerProveedor.storeCierreP)
api.put('/cierresProveedor/:id',cors(),cierreControllerProveedor.updateCierreP)
api.delete('/cierresProveedor/:id',cors(),cierreControllerProveedor.deleteCierreP)

// AJUSTE--------------------------------------------------------------------------
api.options('/ajustes/:id', cors())
api.options('/ajustes/', cors())
api.get('/ajustes',cors(),ajusteController.getAjustes)

api.get('/ajustes/:id',cors(),ajusteController.getAjuste)

api.post('/ajustes',cors(),ajusteController.storeAjuste)

api.put('/ajustes/:id',cors(),ajusteController.updateAjuste)

api.delete('/ajustes/:id',cors(),ajusteController.deleteAjuste)
module.exports = api