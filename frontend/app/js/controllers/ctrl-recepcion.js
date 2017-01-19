'use strict';

app.controller('ctrl-recepcion', function($scope,Recepcion,Proveedor,CierreProveedor,ngProgress) {

$scope.recepcion = new Recepcion();
$scope.proveedor = new Proveedor();
$scope.cierre_p = new CierreProveedor();

var refresh = function() {
  $scope.recepciones = Recepcion.query(); 
  $scope.proveedores = Proveedor.query();
  $scope.cierres = CierreProveedor.query();
  $scope.cierresproveedor = []; 
  //$scope.recepcion ="";
 
}
refresh();

$scope.add = function(recepcion) {
  console.log(recepcion);
  Recepcion.save(recepcion,function(recepcion){

     $scope.recepcion = Recepcion.get({ id: recepcion._id });
    //refresh();
  });
};
$scope.update = function(recepcion) {
  $scope.recepcion.$update(function(recepcionUpdated){

   
    //refresh();
  });
};

$scope.remove = function(recepcion) {
 recepcion.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.recepcion = Recepcion.get({ id: id });
};  

$scope.deselect = function() {
  $scope.recepcion = "";
} 
  // $scope que acciona el ng-change
  $scope.mostrarCierres = function() { 
          // $scope.selCategorias NOS TRAE EL VALOR DEL SELECT DE CATEGORIAS
         console.log( $scope.cierres);
        console.log( $scope.recepcion.proveedor);
    //$scope.isvalid = false;
        //console.log( $scope.cierres[0].cliente._id);
        $scope.cierresproveedor = [];
        for (var i=0; i <$scope.cierres.length; i++){
          if ($scope.cierres[i].proveedor._id == ''+$scope.recepcion.proveedor) {
           $scope.cierresproveedor.push($scope.cierres[i]);
          } 
        }
     
  };
})
