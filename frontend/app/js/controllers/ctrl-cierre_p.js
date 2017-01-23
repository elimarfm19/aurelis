'use strict';

app.controller('ctrl-cierre_p', function($scope,$rootScope,CierreProveedor,ngProgress) {

$scope.cierre_p = new CierreProveedor();

var refresh = function() {
  $scope.cierres_p = CierreProveedor.query(); 
  //$scope.cierre ="";
}
refresh();

$scope.add = function(cierre_p) {
  console.log(cierre_p);
  CierreProveedor.save(cierre_p,function(cierre_p){
  	
   //refresh();
   $scope.cierre_p = CierreProveedor.get({ id: cierre_p._id });
  });
};
$scope.update = function(cierre_p) {
console.log(cierre_p);
console.log("Valor Raiz "+$rootScope.scopeRaiz);
  //cierre_p.monto_pagado = document.getElementById('monto_pagado').value;
  cierre_p.monto_pagado = $rootScope.scopeRaiz;
  $scope.cierre_p.$update(function(cierre_pUpdated){
  	
  	refresh();
  });
};

$scope.remove = function(cierre_p) {
 CierreProveedor.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.cierre_p = CierreProveedor.get({ id: id });
};  

$scope.deselect = function() {
  $scope.cierre_p = "";
}

})