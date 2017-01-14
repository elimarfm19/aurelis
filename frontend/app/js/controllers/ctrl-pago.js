'use strict';

app.controller('ctrl-pago', function($scope,Pago,ngProgress) {

$scope.pago = new Pago();

var refresh = function() {
  $scope.pagos = Pago.query(); 
  $scope.pago ="";
}
refresh();

$scope.add = function(pago) {
  console.log(pago);
  Pago.save(pago,function(pago){
    refresh();
  });
};
$scope.update = function(pago) {
  $scope.pago.$update(function(){
    refresh();
  });
};

$scope.remove = function(pago) {
 pago.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.pago = Pago.get({ id: id });
};  

$scope.deselect = function() {
  $scope.pago = "";
}
$scope.direccion = function(id) {
  $scope.pago = Pago.get({ id: id });
}; 
})
