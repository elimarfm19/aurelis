'use strict';

/**
 * @ngdoc overview
 * @name aurelisApp
 * @description
 * # aurelisApp
 *
 * Main module of the application.
 */
var app = angular.module('aurelisApp', ['ngResource','ngAnimate','ngProgress',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch']);


  app.config(function ($routeProvider) {
    $routeProvider
       .when('/', {
        templateUrl: '/views/vista_inicio.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/cliente', {
        templateUrl: '/views/vista_cliente.html',
        controller: 'ctrl-cliente',
        controllerAs: 'cli'
      })
      .when('/cierre_cliente', {
        templateUrl: '/views/vista_cierre_c.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/proveedores', {
        templateUrl: '/views/vista_proveedor.html',
        controller: 'ctrl-proveedor',
        controllerAs: 'pro'
      })
      .when('/cierre_proveedor', {
        templateUrl: '/views/vista_cierre_p.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/entrega', {
        templateUrl: '/views/vista_entrega.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/ajuste Cierre', {
        templateUrl: '/views/vista_ajuste_cierre.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/ajustePieza', {
        templateUrl: '/views/vista_ajuste_pieza.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/inventario', {
        templateUrl: '/views/vista_inventario.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: '/views/views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  
  // Create a resource factory to access products table from database 
app.factory('Cliente', function($resource) {
  return $resource('http://localhost:3001/clientes/:id', { id: '@_id' }, {
    update: { // We need to define this method manually as it is not provided with ng-resource
      method: 'PUT'
    }
  });
});
// Create a resource factory to access products table from database 
app.factory('Proveedor', function($resource) {
  return $resource('http://localhost:3001/proveedores/:id', { id: '@_id' }, {
    update: { // We need to define this method manually as it is not provided with ng-resource
      method: 'PUT'
    }
  });
});

