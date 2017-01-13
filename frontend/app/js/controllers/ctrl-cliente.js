'use strict';

app.controller('ctrl-cliente', function($scope,Cliente,ngProgress) {

$scope.cliente = new Cliente();

var refresh = function() {
  $scope.clientes = Cliente.query(); 
  $scope.cliente ="";
}
refresh();

$scope.add = function(cliente) {
  console.log(cliente);
  Cliente.save(cliente,function(cliente){
    refresh();
  });
};
$scope.update = function(cliente) {
  $scope.cliente.$update(function(){
    refresh();
  });
};

$scope.remove = function(cliente) {
 cliente.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.cliente = Cliente.get({ id: id });
};  

$scope.deselect = function() {
  $scope.cliente = "";
}
$scope.direccion = function(id) {
  $scope.cliente = Cliente.get({ id: id });
}; 
})
