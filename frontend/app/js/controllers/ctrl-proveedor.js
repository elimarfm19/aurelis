'use strict';

app.controller('ctrl-proveedor', function($scope,Proveedor,ngProgress) {

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
$scope.direccion = function(id) {
  $scope.proveedor = Proveedor.get({ id: id });
};
$scope.verifyDuplicate = function() {

      $scope.isvalid = false;

       angular.forEach($scope.proveedores, function(value, key){
        if(!$scope.isvalid)
        {
          if(value.nacionalidad+value.ced_rif == $scope.proveedor.nacionalidad+$scope.proveedor.ced_rif)
          {
            $scope.isvalid = true;
          }
        }
        });
    };
})
