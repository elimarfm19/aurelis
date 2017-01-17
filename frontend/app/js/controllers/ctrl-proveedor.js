'use strict';

app.controller('ctrl-proveedor', function($scope,Proveedor,CierreProveedor,ngProgress) {

$scope.proveedor = new Proveedor();
$scope.cierres_p = new CierreProveedor();

var refresh = function() {
  $scope.proveedores = Proveedor.query(); 
  $scope.cierres_p = CierreProveedor.query();
  $scope.cierresproveedor = [];
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

  // $scope que acciona el ng-change
  $scope.mostrarCierres = function() { 
          // $scope.selCategorias NOS TRAE EL VALOR DEL SELECT DE CATEGORIAS
         //console.log( $scope.cliente);
    //$scope.isvalid = false;
        //console.log( $scope.cierres[0].cliente._id);
        $scope.cierresproveedor = [];
        for (var i=0; i <$scope.cierres_p.length; i++){
          if ($scope.cierres_p[i].proveedor._id == ''+$scope.proveedor) {
           $scope.cierresproveedor.push($scope.cierres_p[i]);
          } 
        }
     
  };
})
