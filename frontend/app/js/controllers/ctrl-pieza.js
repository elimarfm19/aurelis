'use strict'

app.controller('ctrl-pieza', function($scope,$rootScope,$http,Pieza,Recepcion,Cliente,Entrega,ngProgress) {

$scope.pieza = new Pieza();
$scope.cliente = new Cliente();
//$scope.recepcion = new Recepcion();
var refresh = function() {
  $scope.piezas = Pieza.query();
  $scope.recepciones = Recepcion.query();
  $scope.entregas = Entrega.query();   
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
  //console.log(pieza);
 // let check = document.getElementById('check'+pieza._id).checked

 //  if(check)
 //    $scope.pieza.entrega =document.getElementById('entrega_id').value;
  
 //  else{ 
 //    $scope.pieza.entrega = null;
 //  }
  //console.log(pieza);
 
  $scope.pieza.$update(function(){
    // pieza.status = 'Verificado'
      console.log(pieza)
    refresh();
  });
};

$scope.verificar = function(pieza) {
  pieza.status = 'Verificado'
  $scope.pieza.$update(function(){
    refresh();
  });
};

$scope.ajuste = function(pieza) {
  pieza.status = 'Ajuste'
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

 //var update = document.getElementById("actualizar");

  //update.click();
  //angular.element('#actualizar').trigger('click');
    //angular.element('#actualizar').triggerHandler('click');
};
$scope.editE = function(pieza,cliente) {
  //let pieza = Pieza.get({ id: id })
 //console.log(id.ley);
  let check = document.getElementById('check'+pieza._id).checked
  //let idCliente = document.getElementById('cliente').value;
  //let cliente = Cliente.get({ id: idCliente })
  //console.log(idCliente);
  //pieza.puro = parseFloat(pieza.puro)
  //console.log(idCliente);
  if(check){ 
   console.log(pieza.puro_c);
    pieza.entrega =document.getElementById('entrega_id').value
    pieza.status = 'Entregado'
    cliente.entregado += pieza.puro_c
  }
  
  else{ 
    console.log(pieza.puro_c);
    pieza.entrega = null
    pieza.status = 'Disponible'
    cliente.entregado -= pieza.puro_c
  }
 
  //console.log(pieza.entrega);
 //console.log(cliente.entregado);
  $http.put("http://localhost:3001/piezas/"+pieza._id, pieza)
            .success(function(respuesta){
                console.log(respuesta);
                refresh();
   });
   $http.put("http://localhost:3001/clientes/"+cliente._id, cliente)
            .success(function(respuesta){
                console.log(respuesta);
                refresh();
   });         

  //$scope.pieza = Pieza.get({ id: id });
 // $scope.pieza.entrega =document.getElementById('entrega_id').value;

   //$scope.pieza = Pieza.get({ id: pieza._id });
  //  pieza.$update(function(){
  //  // refresh();
  // });
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
        total += $scope.piezas[i].puro_p;
      } 
  }
 $rootScope.sumaPuro = total;
 console.log($rootScope.sumaPuro);
}

$scope.suma_puroe = function(){
  var entrega_id = document.getElementById('entrega_id').value;
   //console.log("Entrega id"+entrega_id);
  var total=0;
  for (var i=0; i <$scope.piezas.length; i++){
    //console.log($scope.piezas[i].entrega._id);
    if ($scope.piezas[i].entrega != null){
      if ($scope.piezas[i].entrega._id == entrega_id) {
      
        total += $scope.piezas[i].puro_c;
      } 
    } 
  }
 $rootScope.sumaPuroe = parseFloat(total).toFixed(2);
 //console.log($rootScope.sumaPuroE);
}
$scope.showPiezas = function(piezas){
    return piezas.status === 'Disponible' || 
        piezas.entrega._id === document.getElementById('entrega_id').value; 
};

})



