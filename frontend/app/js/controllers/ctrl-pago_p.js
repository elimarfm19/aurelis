'use strict';

app.controller('ctrl-pago_p', function($scope,$rootScope,PagoProveedor,ngProgress) {

$scope.pago_p = new PagoProveedor();

var refresh = function() {
  $scope.pagos_p = PagoProveedor.query(); 
  $scope.pago_p ="";
}
refresh();

$scope.add = function(pago_p) {
  pago_p.cierre_p =document.getElementById('cierre_p_id').value;
  console.log(pago_p);
  PagoProveedor.save(pago_p,function(pago_p){
    refresh();
  });
};
$scope.update = function(pago_p) {
  pago_p.fecha = new Date(pago_p.fecha);
  $scope.pago_p.$update(function(){
    refresh();
  });
};

$scope.remove = function(pago_p) {
 pago_p.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.pago_p = PagoProveedor.get({ id: id });
 
};  

$scope.deselect = function() {
  $scope.pago_p = "";
}

$scope.monto_pagado_p = function(){
var cierre_p_id = document.getElementById('cierre_p_id').value;
//console.log(cierre_p_id);
var total=0;
for (var i=0; i <$scope.pagos_p.length; i++){
    if ($scope.pagos_p[i].cierre_p._id == cierre_p_id) {
      total += $scope.pagos_p[i].monto_pagado;
    } 
}
 $rootScope.scopeRaiz = total;
}
})
