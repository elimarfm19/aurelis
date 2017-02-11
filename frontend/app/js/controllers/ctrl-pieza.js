'use strict'

app.controller('ctrl-pieza', function($scope,$rootScope,$http,Pieza,Recepcion,Cliente,Entrega,ngProgress,DTOptionsBuilder,$window) {

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
      //console.log(pieza)
    refresh();
  });
};

$scope.verificar = function(pieza) {
  pieza.status = 'Verificado'
  $scope.pieza.$update(function(){
    $window.location.reload();
  });
};

$scope.ajuste = function(piezaNueva) {

  piezaNueva.status = 'Ajuste';
  piezaNueva.puro_c = parseFloat(piezaNueva.peso_entrega*(piezaNueva.ley/1000)).toFixed(2);
  piezaNueva.puro_p = parseFloat(piezaNueva.peso_bruto*(piezaNueva.ley/1000)).toFixed(2);

   $http.get("http://localhost:3001/piezas/"+piezaNueva._id)
    .success(function(piezaVieja){

        if (piezaVieja.ley!=piezaNueva.ley){ 
          // console.log(piezaVieja[0].recepcion.proveedor._id);
          //console.log(piezaVieja.recepcion.proveedor._id);

          $http.get("http://localhost:3001/proveedores/"+piezaVieja[0].recepcion.proveedor._id)
          .success(function(proveedor){
            // console.log(Number(piezaNueva.puro_p).toFixed(2));
            //console.log('Proveedor '+proveedor.entregado);
            // console.log(piezaVieja[0].puro_p);

              proveedor.entregado -= parseFloat(piezaVieja[0].puro_p).toFixed(2);
              // console.log('Proveedor '+proveedor.entregado);
              proveedor.entregado += Number(piezaNueva.puro_p); 

             //console.log('Proveedor '+proveedor.entregado);
            $http.put("http://localhost:3001/proveedores/"+proveedor._id,proveedor)
              .success(function(proveedorNuevo){ 
               // console.log('Actualizando proveedor');
                //console.log(proveedorNuevo);
            });


          });

          $http.get("http://localhost:3001/clientes/"+piezaVieja[0].entrega.cliente._id)
          .success(function(cliente){
              // console.log('Cliente '+cliente.entregado);
              cliente.entregado -= parseFloat(piezaVieja[0].puro_c).toFixed(2);
              //console.log('Cliente '+cliente.entregado);
              cliente.entregado += Number(piezaNueva.puro_c); 
            //   console.log('Cliente '+cliente.entregado);
            $http.put("http://localhost:3001/clientes/"+cliente._id,cliente)
              .success(function(clienteNuevo){ 
                //console.log('Actualizando cliente');
               // console.log(clienteNuevo);
            });


          });

        }

        if (piezaVieja.peso_entrega!=piezaNueva.peso_entrega){
          //console.log('modifica el peso_entrega');
          $http.get("http://localhost:3001/clientes/"+piezaVieja[0].entrega.cliente._id)
          .success(function(cliente){
              // console.log('Cliente '+cliente.entregado);
              cliente.entregado -= parseFloat(piezaVieja[0].puro_c).toFixed(2);
              //console.log('Cliente '+cliente.entregado);
              cliente.entregado += Number(piezaNueva.puro_c); 
            //   console.log('Cliente '+cliente.entregado);
            $http.put("http://localhost:3001/clientes/"+cliente._id,cliente)
              .success(function(clienteNuevo){ 
                //console.log('Actualizando cliente');
                //console.log(clienteNuevo);
            });


          });
        }


   });

  // $http.put("http://localhost:3001/piezas/"+piezaNueva._id,piezaNueva)
  //             .success(function(piezaActualizada){ 
  //               console.log('Actualizando Pieza');
  //               console.log(piezaActualizada);
  // });

  
  //console.log(pieza);
  // $scope.pieza.$update(function(){
  //   //refresh();
  //   $window.location.reload();
  // });
};

$scope.remove = function(pieza) {
 pieza.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {

  $http.get("http://localhost:3001/piezas/"+id)
              .success(function(pieza){ 

                $scope.pieza = new Pieza();//Pieza.get({ id: pieza._id });
                //console.log('Actualizando Pieza');
                //console.log($scope.pieza);
                // $scope.pieza._id = pieza[0]._id;
                // $scope.pieza.piezaId = pieza[0].piezaId;
                // $scope.pieza.ley = pieza[0].ley;

                $scope.pieza=pieza[0];
                //console.log(pieza[0]._id);

  });


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


  var language = {

    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Buscar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
}

  $scope.dtOptions = DTOptionsBuilder.newOptions()
        
    .withLanguage(language)

})



