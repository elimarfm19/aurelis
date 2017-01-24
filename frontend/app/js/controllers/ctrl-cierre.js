'use strict';

app.controller('ctrl-cierre', function($scope,$rootScope,$filter,Cierre,Cliente,ngProgress,$window) {

$scope.cierre = new Cierre();
$scope.cliente = new Cliente();
var refresh = function() {
  $scope.cierres = Cierre.query();
  $scope.clientes = Cliente.query(); 
  //$scope.cierre ="";
}
refresh();

$scope.add = function(cierre) {
  console.log(cierre.cliente);
  cierre.fecha_entrega =document.getElementById('fecha_entrega').value;
  Cierre.save(cierre,function(cierre){
  	
   //refresh();
   $scope.cierre = Cierre.get({ id: cierre._id });
  });
};
$scope.update = function(cierre) {
  console.log(cierre);
  cierre.fecha_entrega =document.getElementById('fecha_entrega').value;
  //cierre.monto_pagado = document.getElementById('monto_pagado').value;
  cierre.monto_pagado = $rootScope.scopeRaiz;
  $scope.cierre.$update(function(cierreUpdated){
  	
  	refresh();
  });
};

$scope.remove = function(cierre) {
  console.log(cierre);
  cierre.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.cierre = Cierre.get({ id: id });
};  

$scope.deselect = function() {
  $window.location.reload();
}

$scope.date = function() {
  $scope.date = $filter('date')($scope.cierre.fecha_entrega, "yyyy-MM-dd");;
}


})