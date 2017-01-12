'use strict';

/**
 * @ngdoc overview
 * @name aurelisApp
 * @description
 * # aurelisApp
 *
 * Main module of the application.
 */

angular
  .module('aurelisApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngPagination'
  ])
  .config(function ($routeProvider) {
    $routeProvider
       .when('/', {
        templateUrl: '/views/vista_inicio.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/cliente', {
        templateUrl: '/views/vista_cliente.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/cierre_cliente', {
        templateUrl: '/views/vista_cierre_c.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/proveedor', {
        templateUrl: '/views/vista_proveedor.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
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


