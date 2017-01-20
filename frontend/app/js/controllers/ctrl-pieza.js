'use strict';

app.controller('ctrl-pieza', function($scope,$rootScope,Pieza,Recepcion,ngProgress) {

$scope.pieza = new Pieza();
//$scope.recepcion = new Recepcion();
var refresh = function() {
  $scope.piezas = Pieza.query();
  $scope.recepciones = Recepcion.query();  
  $scope.pieza ="";
}
refresh();

$scope.add = function(pieza) {
  pieza.recepcion =document.getElementById('recepcion_id').value;
  console.log(pieza);
  Pieza.save(pieza,function(pieza){
    refresh();
  });
};

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

$scope.suma_puro = function(){
  var recepcion_id = document.getElementById('recepcion_id').value;
   //console.log(recepcion_id);
  var total=0;
  for (var i=0; i <$scope.piezas.length; i++){
      if ($scope.piezas[i].recepcion._id == recepcion_id) {
        total += $scope.piezas[i].puro;
      } 
  }
 $rootScope.sumaPuro = total;
 console.log($rootScope.sumaPuro);
}

})



