'use strict';

var app = angular.module('TablaDemo', []);
app.controller('TablaCtrl', ['$scope', function($scope) {
  $scope.lista = [{
    orden: 1,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf'
  }, {
    orden: 2,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf'    
  }, {
    orden: 3,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf'
  }, {
    orden: 4,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf'
  }, {
    orden: 5,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf'
  }, {
    orden: 6,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf'
  }, {
    orden: 7,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf'
  }, {
    orden: 8,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf'
  }, {
    orden: 9,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf'
  }, {
    orden: 10,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf'
  }, {
    orden: 11,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf'
  }, {
    orden: 12,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf'
  }, {
    orden: 13,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf',
    monto_cerrado: 'kdvnvn',
    fecha_entrega: 'ncjdklcvdv'
  }, {
    orden: 14,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf',
    monto_cerrado: 'kdvnvn',
    fecha_entrega: 'ncjdklcvdv'
  }, {
    orden: 15,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf',
    monto_cerrado: 'kdvnvn',
    fecha_entrega: 'ncjdklcvdv'
  }, {
    orden: 16,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf',
    monto_cerrado: 'kdvnvn',
    fecha_entrega: 'ncjdklcvdv'
  }, {
    orden: 17,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf',
    monto_cerrado: 'kdvnvn',
    fecha_entrega: 'ncjdklcvdv'
  }, {
    orden: 18,
    cliente: 'Juan',
    cierre: 'Pérez',
    entregado: 'juanperez@gmail.com',
    por_cerrar: 'kfdsf',
    monto_cerrado: 'kdvnvn',
    fecha_entrega: 'ncjdklcvdv'
  }];

$scope.currentPage = 0;
$scope.pageSize = 10; // Esta la cantidad de registros que deseamos mostrar por página
$scope.pages = [];

$scope.configPages = function() {
    $scope.pages.length = 0;
    var ini = $scope.currentPage - 4;
    var fin = $scope.currentPage + 5;
    if (ini < 1) {
      ini = 1;
      if (Math.ceil($scope.lista.length / $scope.pageSize) > 10) fin = 10;
      else fin = Math.ceil($scope.lista.length / $scope.pageSize);
    } else {
      if (ini >= Math.ceil($scope.lista.length / $scope.pageSize) - 10) {
        ini = Math.ceil($scope.lista.length / $scope.pageSize) - 10;
        fin = Math.ceil($scope.lista.length / $scope.pageSize);
      }
    }
    if (ini < 1) ini = 1;
    for (var i = ini; i <= fin; i++) {
      $scope.pages.push({ no: i });
    }
    if ($scope.currentPage >= $scope.pages.length)
      $scope.currentPage = $scope.pages.length - 1;
  };
  $scope.setPage = function(index) {
    $scope.currentPage = index - 1;
  };
  
  $scope.configPages();

  $scope.eliminar = function(row) {
    if (confirm("¿Seguro que desea eliminar?")) {
      $scope.lista.splice(row, 1);
    }
  };

  $scope.agregar = function() {
    $scope.lista.push({
      cliente: '',
      cierre: '',
      entregado: '',
      por_cerrar: '',
      monto_cerrado: '',
      fecha_entrega: ''
    })
  };

  $scope.recuperarValores = function() {
    console.log($scope.lista);
    $("#JSON").text(JSON.stringify($scope.lista));
  };
}]);

app.directive('editableTd', [function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.css("cursor", "pointer");
      element.attr('contenteditable', 'true');

      element.bind('blur keyup change', function() {
        scope.lista[attrs.row][attrs.field] = element.text();
      });

      element.bind('click', function() {
        document.execCommand('selectAll', false, null)
      });
    }
  };
}]);


app.filter('startFromGrid', function() {
   return function(input, start) {
      start = +start;
      return input.slice(start);
   };
});

 