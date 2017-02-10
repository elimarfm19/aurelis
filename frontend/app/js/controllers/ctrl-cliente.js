'use strict';

app.controller('ctrl-cliente', function($scope,Cliente,Cierre,ngProgress,DTOptionsBuilder,$window) {

$scope.cliente = new Cliente();
$scope.cierre = new Cierre();

var refresh = function() {
  $scope.clientes = Cliente.query(); 
  $scope.cierres = Cierre.query();
  $scope.cierrescliente = [];
  $scope.cliente ="";
}
refresh();

$scope.add = function(cliente) {
  //console.log(cliente);
  Cliente.save(cliente,function(cliente){
   //refresh();
    $window.location.reload();
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

$scope.verifyDuplicate = function() {

      $scope.isvalid = false;

       angular.forEach($scope.clientes, function(value, key){
        if(!$scope.isvalid)
        {
         if(value.nacionalidad+value.ced_rif == $scope.cliente.nacionalidad+$scope.cliente.ced_rif)
          {
            $scope.isvalid = true;
          }
        }
        });
    };

  // $scope que acciona el ng-change
  $scope.mostrarCierres = function(id) { 
          // $scope.selCategorias NOS TRAE EL VALOR DEL SELECT DE CATEGORIAS
        console.log( id);
    //$scope.isvalid = false;
       // console.log( $scope.cierres[0].cliente._id);
        //console.log( 'hola');
        $scope.cierrescliente = [];
        for (var i=0; i <$scope.cierres.length; i++){
          if ($scope.cierres[i].cliente._id == id) {
           $scope.cierrescliente.push($scope.cierres[i]);
          } 
        }
     
  };

$scope.buscarCliente = function(id) { 
      //console.log(id);
      $scope.cliente = Cliente.get({ id: id });
      console.log($scope.cliente);
     
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
