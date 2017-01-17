'use strict';

app.controller('ctrl-cierre', function($scope,Cierre,Cliente,ngProgress) {

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

  Cierre.save(cierre,function(cierre){
  	
   //refresh();
   $scope.cierre = Cierre.get({ id: cierre._id });
  });
};
$scope.update = function(cierre) {
  console.log(cierre);
  cierre.monto_pagado = document.getElementById('monto_pagado').value;
  $scope.cierre.$update(function(cierreUpdated){
  	
  	refresh();
  });
};

$scope.remove = function(cierre) {
 cierre.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.cierre = Cierre.get({ id: id });
};  

$scope.deselect = function() {
  $scope.cierre = "";
}

})