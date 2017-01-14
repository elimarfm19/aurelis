'use strict';

app.controller('ctrl-entrega', function($scope,Entrega,ngProgress) {

$scope.entrega = new Entrega();

var refresh = function() {
  $scope.entregas = Entrega.query(); 
  $scope.entrega ="";
}
refresh();

$scope.add = function(entrega) {
  console.log(entrega);
  Entrega.save(entrega,function(entrega){
    refresh();
  });
};
$scope.update = function(entrega) {
  $scope.entrega.$update(function(){
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
