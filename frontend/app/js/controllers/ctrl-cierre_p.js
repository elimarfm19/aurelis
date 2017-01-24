'use strict';

app.controller('ctrl-cierre_p', function($scope,$filter,$rootScope,CierreProveedor,ngProgress,$window) {

$scope.cierre_p = new CierreProveedor();

var refresh = function() {
  $scope.cierres_p = CierreProveedor.query(); 
  //$scope.cierre ="";
}
refresh();

$scope.add = function(cierre_p) {
  // console.log(cierre_p);
  cierre_p.fecha_entrega =document.getElementById('fecha_entrega').value;
  CierreProveedor.save(cierre_p,function(cierre_p){
  	
   //refresh();
   $scope.cierre_p = CierreProveedor.get({ id: cierre_p._id });
  });
};
$scope.update = function(cierre_p) {
// console.log(cierre_p);
console.log("Valor Raiz "+$rootScope.scopeRaiz);
  //cierre_p.monto_pagado = document.getElementById('monto_pagado').value;
  cierre_p.fecha_entrega =document.getElementById('fecha_entrega').value;
  cierre_p.monto_pagado = $rootScope.scopeRaiz;
  $scope.cierre_p.$update(function(cierre_pUpdated){
  	
  	refresh();
  });
};

$scope.remove = function(cierre_p) {
  console.log('aqui');
  cierre_p.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.cierre_p = CierreProveedor.get({ id: id });
};  

$scope.deselect = function() {
  //$window.location.href="http://localhost:9000/aurelis.html#/cierre_proveedor";
  //$route.reload();
  $window.location.reload();

  // $scope.cierre_p = "";
  // $scope.pago_p = "";
}

$scope.date = function() {
  $scope.date = $filter('date')($scope.cierre_p.fecha_entrega, "yyyy-MM-dd");
}
})