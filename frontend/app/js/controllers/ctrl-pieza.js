'use strict';

app.controller('ctrl-pieza', function($scope,$rootScope,$http,Pieza,Recepcion,Cliente,Entrega,ngProgress,DTOptionsBuilder,$window) {

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
  $http.put(route_backend+"piezas/"+pieza._id,pieza)
              .success(function(piezaActualizada){ 
                // console.log('Actualizando Pieza');
                // console.log(piezaActualizada);
                $window.location.reload();
  });
  // console.log(pieza)
  // $scope.pieza.$update(function(){
    // $window.location.reload();
  // });
};

$scope.ajuste = function(piezaNueva) {

  piezaNueva.status = 'Ajuste';
  piezaNueva.puro_c = parseFloat(piezaNueva.peso_entrega*(piezaNueva.ley/1000)).toFixed(2);
  piezaNueva.puro_p = parseFloat(piezaNueva.peso_bruto*(piezaNueva.ley/1000)).toFixed(2);

   $http.get(route_backend+"piezas/"+piezaNueva._id)
    .success(function(piezaVieja){

        if (piezaVieja.ley!=piezaNueva.ley){ 
          // console.log(piezaVieja[0].recepcion.proveedor._id);
          //console.log(piezaVieja.recepcion.proveedor._id);

          $http.get(route_backend+"proveedores/"+piezaVieja[0].recepcion.proveedor._id)
          .success(function(proveedor){
            // console.log(Number(piezaNueva.puro_p).toFixed(2));
            //console.log('Proveedor '+proveedor.entregado);
            // console.log(piezaVieja[0].puro_p);

              proveedor.entregado -= parseFloat(piezaVieja[0].puro_p).toFixed(2);
              // console.log('Proveedor '+proveedor.entregado);
              proveedor.entregado += Number(piezaNueva.puro_p); 

             //console.log('Proveedor '+proveedor.entregado);
            $http.put(route_backend+"proveedores/"+proveedor._id,proveedor)
              .success(function(proveedorNuevo){ 
               // console.log('Actualizando proveedor');
                //console.log(proveedorNuevo);
            });


          });

          $http.get(route_backend+"clientes/"+piezaVieja[0].entrega.cliente._id)
          .success(function(cliente){
              // console.log('Cliente '+cliente.entregado);
              cliente.entregado -= parseFloat(piezaVieja[0].puro_c).toFixed(2);
              //console.log('Cliente '+cliente.entregado);
              cliente.entregado += Number(piezaNueva.puro_c); 
            //   console.log('Cliente '+cliente.entregado);

            $http.put(route_backend+"clientes/"+cliente._id,cliente)
              .success(function(clienteNuevo){ 
                //console.log('Actualizando cliente');
               // console.log(clienteNuevo);
            });


          });

        }

        if (piezaVieja.peso_entrega!=piezaNueva.peso_entrega){
          //console.log('modifica el peso_entrega');
          $http.get(route_backend+"clientes/"+piezaVieja[0].entrega.cliente._id)
          .success(function(cliente){
              // console.log('Cliente '+cliente.entregado);
              cliente.entregado -= parseFloat(piezaVieja[0].puro_c).toFixed(2);
              //console.log('Cliente '+cliente.entregado);
              cliente.entregado += Number(piezaNueva.puro_c); 
            //   console.log('Cliente '+cliente.entregado);
            $http.put(route_backend+"clientes/"+cliente._id,cliente)
              .success(function(clienteNuevo){ 
                //console.log('Actualizando cliente');
                //console.log(clienteNuevo);
            });


          });
        }
        $http.get(route_backend+"recepciones/"+piezaVieja[0].recepcion._id)
              .success(function(RecepcionVieja){ 
               // console.log('Actualizando Pieza');
               // console.log(piezaActualizada);
               // $window.location.reload();
               //$scope.recepcion = new Recepcion();
               //RecepcionVieja.cantidad =  RecepcionVieja[0].cantidad;
               // console.log( $scope.recepcion.cantidad );

               RecepcionVieja.cantidad -= parseFloat(piezaVieja[0].puro_p).toFixed(2);
               RecepcionVieja.cantidad += Number(piezaNueva.puro_p);

          $http.put(route_backend+"recepciones/"+RecepcionVieja._id,RecepcionVieja)
              .success(function(RecepcionActualizada){ 
                //console.log('Actualizando Pieza');
               // console.log(piezaActualizada);
                //$window.location.reload();
          
          });


        });
        $http.get(route_backend+"entregas/"+piezaVieja[0].entrega._id)
              .success(function(EntregaVieja){ 
               // console.log('Actualizando Pieza');
               // console.log(piezaActualizada);
               // $window.location.reload();
               //$scope.entrega = new Entrega();

                //$scope.entrega.cantidad =  EntregaVieja[0].cantidad;

                //console.log( $scope.entrega.cantidad );

               EntregaVieja.cantidad -= parseFloat(piezaVieja[0].puro_c).toFixed(2);
               EntregaVieja.cantidad += Number(piezaNueva.puro_c);

          $http.put(route_backend+"entregas/"+EntregaVieja._id,EntregaVieja)
              .success(function(EntregaActualizada){ 
              //console.log('Actualizando Pieza');
              // console.log(piezaActualizada);
              //$window.location.reload();
          
          });


        });

        $http.get(route_backend+"historial/entrega/"+piezaVieja[0].entrega._id)
              .success(function(historial){

                $http.get(route_backend+"historial/entregas/"+historial[0].HistorialClienteId)
                  .success(function(historiales){
                  
                    for (var i=0; i < historiales.length; i++){           
                    
                        console.log(historial);
                        historiales[i].entregado -= parseFloat(piezaVieja[0].puro_c).toFixed(2);

                        historiales[i].entregado += Number(piezaNueva.puro_c);
                        
                        historiales[i].pendiente = (- Number(historiales[i].cerrado) + Number(historiales[i].entregado)) ;
                         console.log(historiales);
                        $http.put(route_backend+"historial/"+historiales[i]._id,historiales[i])
                          .success(function(historialNuevo){ 
                           console.log(historialNuevo);
                            //$window.location.reload();

                        });
                    }
                  });
              });


   });

  $http.put(route_backend+"piezas/"+piezaNueva._id,piezaNueva)
              .success(function(piezaActualizada){ 
                // console.log('Actualizando Pieza');
                // console.log(piezaActualizada);

              
  });


  
  // console.log(pieza);
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

  $http.get(route_backend+"piezas/"+id)
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
  $http.put(route_backend+"piezas/"+pieza._id, pieza)
            .success(function(respuesta){
                console.log(respuesta);
                refresh();
   });
   $http.put(route_backend+"clientes/"+cliente._id, cliente)
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
  var entrega_id = document.getElementById('entrega_id').value;

  if ((piezas.status === 'Disponible' ) || (piezas.entrega._id === entrega_id )) {
    return true;
  }else{
    return false;
  }
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
        .withOption('rowreorder', true)
        .withOption('responsive', true)
        .withOption('info', false); 
  

})



