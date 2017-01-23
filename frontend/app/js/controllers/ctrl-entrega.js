'use strict';

app.controller('ctrl-entrega', function($scope,Entrega,Cliente,Cierre,ngProgress) {

$scope.entrega = new Entrega();
$scope.cliente = new Cliente();
$scope.cierre = new Cierre();

var refresh = function() {
  $scope.entregas = Entrega.query(); 
  $scope.clientes = Cliente.query();
  $scope.cierres = Cierre.query();
  $scope.cierrescliente = [];  //cierresproveedor
}
refresh();

$scope.add = function(entrega) {
  console.log(entrega);
  Entrega.save(entrega,function(entrega){
       $scope.entrega = Entrega.get({ id: entrega._id });
    refresh();
  });
};

$scope.update = function(entrega) {

  entrega.cantidad = document.getElementById('cantidad').value;
  console.log(entrega.cantidad);
  $scope.entrega.$update(function(entregaUpdated){
  refresh();
  });
};


$scope.remove = function(entrega) {
 entrega.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.entrega = Entrega.get({ id: id });
};  

$scope.deselect = function() {
  $scope.entrega = "";
} 

})
