'use strict';

/**
 * @ngdoc overview
 * @name aurelisApp
 * @description
 * # aurelisApp
 *
 * Main module of the application.
 */
var app = angular.module('aurelisApp', ['ngResource','ngAnimate','ngProgress','datatables',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch']);

var route = 'http://localhost:3001/';//http://aurelis-backend.herokuapp.com/'; //


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
        controller: 'ctrl-cierre',
        controllerAs: 'cie'
      })
      .when('/cierre_cliente/:cierreId', {
        templateUrl: '/views/vista_cierre_c.html',
        controller: 'ctrl-cierre',
        controllerAs: 'cie'
      })
      .when('/proveedores', {
        templateUrl: '/views/vista_proveedor.html',
        controller: 'ctrl-proveedor',
        controllerAs: 'pro'
      })
      .when('/cierre_proveedor', {
        templateUrl: '/views/vista_cierre_p.html',
        controller: 'ctrl-cierre_p',
        controllerAs: 'cierreP'
      })
      .when('/entrega', {
        templateUrl: '/views/vista_entrega.html',
        controller: 'ctrl-entrega',
        controllerAs: 'ent'
      })
      .when('/recepcion', {
        templateUrl: '/views/vista_recepcion.html',
        controller: 'ctrl-recepcion',
        controllerAs: 'cre'
      })
      .when('/ajusteCierre', {
        templateUrl: '/views/vista_listaCierre.html',
        controller: 'ctrl-cierre',
        controllerAs: 'cie'
      })
      .when('/ajusteCierreProveedor', {
        templateUrl: '/views/vista_ajuste_cierre_p.html',
        controller: 'ctrl-cierre_p',
        controllerAs: 'cie'
      })
      .when('/ajustePieza', {
        templateUrl: '/views/vista_ajuste_pieza.html',
        controller: 'ctrl-pieza',
        controllerAs: 'ajuste_pieza'
      })
      .when('/inventario', {
        templateUrl: '/views/vista_inventario.html',
        controller: 'ctrl-pieza',
        controllerAs: 'inv'
      })
      .when('/reporteCierreC', {
        templateUrl: '/views/vista_reporteCierreC.html',
        controller: 'ctrl-cierre',
        controllerAs: 'RcierreC'
      })
      .when('/reporteCierreP', {
        templateUrl: '/views/vista_reporteCierreP.html',
        controller: 'ctrl-cierre_p',
        controllerAs: 'RcierreP'
      })
      .when('/reporteDetalleCierreP', {
        templateUrl: '/views/vista_reporteDetallesCierreP.html',
        controller: 'ctrl-cierre_p',
        controllerAs: 'RDetallesCierreP'
      })
      .when('/reporteRecepcion', {
        templateUrl: '/views/vista_reporteRecepcion.html',
        controller: 'ctrl-proveedor',
        controllerAs: 'pro'
      })
      .when('/reporteRecepcionPro', {
        templateUrl: '/views/vista_reporteRecepcionP.html',
        controller: 'ctrl-proveedor',
        controllerAs: 'pro'
      })
      .when('/reporteEntrega', {
        templateUrl: '/views/vista_reporteEntrega.html',
        controller: 'ctrl-cliente',
        controllerAs: 'cli'
      })
      .when('/reporteEntregaC', {
        templateUrl: '/views/vista_reporteEntregaC.html',
        controller: 'ctrl-cliente',
        controllerAs: 'cli'
      })
      // .when('/generarPDF', {
      //   templateUrl: '/views/vista_generarPDF.html',
      //   controller: 'ctrl-cliente',
      //   controllerAs: 'cli'
      // })
      .when('/about', {
        templateUrl: '/views/views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  

app.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        

        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            var symbol ="Bs "; // dummy usage
            
            ctrl.$formatters.unshift(function (a) {
             // console.log(a);
                return symbol + $filter(attrs.format)(ctrl.$modelValue) ;
            });

            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                elem.val(symbol + $filter('number')(plainNumber));
                return plainNumber;
            });
        }
    };
}]);
app.directive('gramos', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        

        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            var symbol =" "; // dummy usage
            
            ctrl.$formatters.unshift(function (a) {
             // console.log(a);
                return  $filter(attrs.gramos)(ctrl.$modelValue) + symbol ;
            });

            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                elem.val(symbol + $filter('number')(plainNumber));
                return plainNumber;
            });
        }
    };
}]);

  // Create a resource factory to access clientes table from database 
app.factory('Cliente', function($resource) {
  return $resource(route+'clientes/:id', { id: '@_id' }, {
    update: { // We need to define this method manually as it is not provided with ng-resource
      method: 'PUT'
    }
  });
});
// Create a resource factory to access proveedores table from database 
app.factory('Proveedor', function($resource) {
  return $resource(route+'proveedores/:id', { id: '@_id' }, {
    update: { // We need to define this method manually as it is not provided with ng-resource
      method: 'PUT'
    }
  });
});
// Create a resource factory to access cierres table from database 
app.factory('Cierre', function($resource) {
  return $resource(route+'cierres/:id', { id: '@_id' }, {
    update: { // We need to define this method manually as it is not provided with ng-resource
      method: 'PUT'
    }
  });
});
// Create a resource factory to access pagos table from database 
app.factory('Pago', function($resource) {
  return $resource(route+'pagos/:id', { id: '@_id' }, {
    update: { // We need to define this method manually as it is not provided with ng-resource
      method: 'PUT'
    }
  });
});
// Create a resource factory to access pagoProveedor table from database 
app.factory('PagoProveedor', function($resource) {
  return $resource(route+'pagosProveedor/:id', { id: '@_id' }, {
    update: { // We need to define this method manually as it is not provided with ng-resource
      method: 'PUT'
    }
  });
});
// Create a resource factory to access cierresProveedor table from database 
app.factory('CierreProveedor', function($resource) {
  return $resource(route+'cierresProveedor/:id', { id: '@_id' }, {
    update: { // We need to define this method manually as it is not provided with ng-resource
      method: 'PUT'
    }
  });
});
// Create a resource factory to access inventario table from database 
app.factory('Pieza', function($resource) {
  return $resource(route+'piezas/:id', { id: '@_id' }, {
    update: { // We need to define this method manually as it is not provided with ng-resource
      method: 'PUT'
    }
  });
});

  // Create a resource factory to access clientes table from database 
app.factory('Recepcion', function($resource) {
  return $resource(route+'recepciones/:id', { id: '@_id' }, {
    update: { // We need to define this method manually as it is not provided with ng-resource
      method: 'PUT'
    }
  });
});

app.factory('Entrega', function($resource) {
  return $resource(route+'entregas/:id', { id: '@_id' }, {
    update: { // We need to define this method manually as it is not provided with ng-resource
      method: 'PUT'
    }
  });
});

// app.factory('Entrega', function($resource) {
//   return $resource(route+'entregas/cliente/:id', { id: '@_id' }, {
//     update: { // We need to define this method manually as it is not provided with ng-resource
//       method: 'PUT'
//     }
//   });
// });
