'use strict';

app.controller('ctrl-pago', function($scope,$rootScope,Pago,ngProgress) {

$scope.pago = new Pago();

var refresh = function() {
  $scope.pagos = Pago.query(); 
  $scope.pago ="";
}
refresh();

$scope.add = function(pago) {
  pago.cierre =document.getElementById('cierre_id').value;
  console.log(pago);
  Pago.save(pago,function(pago){
    refresh();
  });
};
$scope.update = function(pago) {
  //pago.fecha = new Date(pago.fecha);
  $scope.pago.$update(function(){
    refresh();
  });
};

$scope.remove = function(pago) {
 pago.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.pago = Pago.get({ id: id });
 
};  

$scope.deselect = function() {
  $scope.pago = "";
}
$scope.monto_pagado=function(){
var cierre_id = document.getElementById('cierre_id').value;
var total=0;
for (var i=0; i <$scope.pagos.length; i++){
    if ($scope.pagos[i].cierre._id == cierre_id) {
      total += $scope.pagos[i].monto_pagado;
    } 
}
 $rootScope.scopeRaiz = total;
}
})
