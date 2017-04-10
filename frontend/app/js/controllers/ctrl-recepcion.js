'use strict';

app.controller('ctrl-recepcion', function($scope,Recepcion,Proveedor,CierreProveedor,$http,ngProgress,$window,$rootScope) {

var route_frontend = "http://localhost:9000/";
// var route_frontend = "https://aurelis-frontend.herokuapp.com/";
var route_backend = "http://localhost:3001/";
// var route_backend = "https://aurelis-backend.herokuapp.com/";

if (localStorage.getItem("username") !== null) {
   // console.log($localStorage.username);
    $rootScope.username = localStorage.getItem("username");
    document.getElementById("cont").value = 1200;
  }
  else{
   window.location = route_frontend;
  } 
$scope.recepcion = new Recepcion();
//$scope.proveedor = new Proveedor();
$scope.cierre_p = new CierreProveedor();

var refresh = function() {
  $scope.recepciones = Recepcion.query(); 
  //$scope.proveedores = Proveedor.query();
  $scope.cierres = CierreProveedor.query();
  $scope.cierresproveedor = []; 
  //$scope.recepcion ="";
 
}
refresh();

$scope.add = function(recepcion) {
  //console.log(recepcion);
  Recepcion.save(recepcion,function(recepcion){

     $scope.recepcion = Recepcion.get({ id: recepcion._id });
    //refresh();
  });
};

$scope.update = function(recepcion) {

  recepcion.cantidad = document.getElementById('cantidad').value;
  //console.log(recepcion.cantidad);
  $scope.recepcion.$update(function(recepcionUpdated){

    $http.get(route_backend+"proveedores/"+recepcionUpdated.proveedor)
      .success(function(proveedor){
       
       var historialProveedor = {
          fecha : moment(recepcionUpdated.fecha_entrega).format('DD-MM-YYYY'),
          cierre : null,
          recepcion : recepcionUpdated._id,
          proveedor : recepcionUpdated.proveedor,
          pendiente : (- Number(proveedor.cerrado) + Number(proveedor.entregado) )
       }
        $http.post(route_backend+"historial/proveedor",historialProveedor)
            .success(function(historial){
             console.log(historial); 
            $window.location.reload();
           
        }); 
    });
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
      //  console.log( $scope.cierres);
       // console.log( $scope.recepcion.proveedor);
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
