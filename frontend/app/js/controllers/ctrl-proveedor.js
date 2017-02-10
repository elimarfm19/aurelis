'use strict';

app.controller('ctrl-proveedor', function($scope,Proveedor,CierreProveedor,ngProgress,DTOptionsBuilder,$window) {

$scope.proveedor = new Proveedor();

$scope.cierres_p = new CierreProveedor();

var refresh = function() {
  $scope.proveedores = Proveedor.query(); 
  $scope.cierres_p = CierreProveedor.query();
  $scope.cierresproveedor = [];
  $scope.proveedor ="";

}

refresh();

$scope.add = function(proveedor) {
  //console.log(proveedor);
  Proveedor.save(proveedor,function(proveedor){
    //refresh();

    $window.location.reload();
  });
};
$scope.update = function(proveedor) {
  $scope.proveedor.$update(function(){
    refresh();
  });
};

$scope.remove = function(proveedor) {
 proveedor.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.proveedor = Proveedor.get({ id: id });
};  

$scope.deselect = function() {
  $scope.proveedor = "";
}

$scope.direccion = function(id) {
  $scope.proveedor = Proveedor.get({ id: id });
};

$scope.contacto = function(id) {
  //  console.log($scope.contacto);
  $scope.proveedor = Proveedor.get({ id: id });
 
};

$scope.verifyDuplicate = function() {

      $scope.isvalid = false;

       angular.forEach($scope.proveedores, function(value, key){
        if(!$scope.isvalid)
        {
          if(value.nacionalidad+value.ced_rif == $scope.proveedor.nacionalidad+$scope.proveedor.ced_rif)
          {
            $scope.isvalid = true;
          }
        }
        });
    };

  // $scope que acciona el ng-change
  $scope.mostrarCierres = function(id) { 
          // $scope.selCategorias NOS TRAE EL VALOR DEL SELECT DE CATEGORIAS
         //console.log( $scope.cliente);
    //$scope.isvalid = false;
        //console.log( $scope.cierres[0].cliente._id);
        $scope.cierresproveedor = [];
        for (var i=0; i <$scope.cierres_p.length; i++){
          if ($scope.cierres_p[i].proveedor._id == id) {
           $scope.cierresproveedor.push($scope.cierres_p[i]);
          } 
        }
     
  };

    $scope.buscarProveedor = function(id) { 
      //console.log(id);
      $scope.proveedor = Proveedor.get({ id: id });
      console.log($scope.proveedor);
     
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
