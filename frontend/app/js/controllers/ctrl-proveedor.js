'use strict';

app.controller('ctrl-proveedor', function($scope,$http,Proveedor,ngProgress) {

$scope.proveedor = new Proveedor();

var refresh = function() {
  $scope.proveedores = Proveedor.query(); 
  $scope.proveedor ="";
}
refresh();

$scope.add = function(proveedor) {
  console.log(proveedor);
  Proveedor.save(proveedor,function(proveedor){
    refresh();
  });
};
$scope.update = function(proveedor) {
  $scope.proveedor.$update(function(){
    refresh();
  });
};

$scope.remove = function(proveedor) {
 proveedor.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.proveedor = Proveedor.get({ id: id });
};  

$scope.deselect = function() {
  $scope.proveedor = "";
}

})
