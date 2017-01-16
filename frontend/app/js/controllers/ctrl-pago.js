'use strict';

app.controller('ctrl-pago', function($scope,$filter,Pago,ngProgress) {

$scope.pago = new Pago();

var refresh = function() {
  $scope.pagos = Pago.query(); 
  $scope.pago ="";
}
refresh();

$scope.add = function(pago) {
  pago.cierre =document.getElementById('cierre_id').value;
  console.log(pago);
  Pago.save(pago,function(pago){
    refresh();
  });
};
$scope.update = function(pago) {
  pago.fecha = new Date(pago.fecha);
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
})
