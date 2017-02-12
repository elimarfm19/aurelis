'use strict';

app.controller('ctrl-cliente', function($scope,Cliente,Cierre,ngProgress,DTOptionsBuilder,$window,$http) {

$scope.cliente = new Cliente();
$scope.cierre = new Cierre();
$scope.reporte = true;

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
        .withOption('info', false); 

$scope.generarReporte = function() { 
      //console.log(id);
      //$scope.cliente = Cliente.get({ id: id });
      $scope.reporte = false;
     console.log($scope.cliente);
     console.log($scope.fecha_inicio);
     console.log($scope.fecha_fin);
  
};

$scope.generarpqt= function() {


  var base64Img = null;

  
    // Returns a new array each time to avoid pointer issues
    var getColumns = function () {
        return [
            {title: "Id", dataKey: "id"},
            {title: "Fecha Entrega", dataKey: "fecha"},
            {title: "Cantidad", dataKey: "cantidad"}
        ];
    };

    function imgToBase64(url, callback) {
      if (!window.FileReader) {
          callback(null);
          return;
      }
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
              callback(reader.result.replace('text/xml', 'image/jpeg'));
          };
          reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.send();
    }

    imgToBase64('document.jpg', function(base64) {
        base64Img = base64;
    }); 
       
    $http.get("http://localhost:3001/entregas/cliente/"+$scope.cliente._id)
                .success(function(entregas){
                  //console.log(entregas);
                 var data = []; 
                  for (var i = 0; i < entregas.length; i++) {
                      data.push({
                          id: entregas[i].EntregaId,
                          fecha: moment(entregas[i].fecha_entrega).format('YYYY-MM-DD'),
                          cantidad: entregas[i].cantidad
                      });
                  }
  
       var doc = new jsPDF('p','pt');
       var totalPagesExp = "{total_pages_count_string}";

       var pageContent = function (data) {
        // HEADER
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        if (base64Img) {
            doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
        }
        doc.text("Report", data.settings.margin.left + 15, 22);

        // FOOTER
        var str = "Page " + data.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
    };

    doc.autoTable(getColumns(), data, {
        addPageContent: pageContent,
        margin: {top: 30}
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
    } 


      
       doc.save('table.pdf');

    

    });
             
}
  
})