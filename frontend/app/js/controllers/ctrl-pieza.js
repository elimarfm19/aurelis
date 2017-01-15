'use strict';

app.controller('ctrl-pieza', function($scope,Pieza,ngProgress) {

$scope.pieza = new Pieza();

var refresh = function() {
  $scope.piezas = Pieza.query(); 
  $scope.pieza ="";
}
refresh();

$scope.update = function(pieza) {
  $scope.pieza.$update(function(){
    refresh();
  });
};

$scope.remove = function(pieza) {
 pieza.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.pieza = Pieza.get({ id: id });
};  

$scope.deselect = function() {
  $scope.pieza = "";
}

})



