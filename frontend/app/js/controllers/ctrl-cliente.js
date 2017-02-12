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



//   $scope.openPdf = function() {
//     $http.get("http://localhost:3001/entregas/cliente/"+$scope.cliente._id)
//             .success(function(entregas){

//           // var body =[ {text:'Apple',text: '100 grams',text: '52'}

//   //         // ];
//           var column = [];
//   //         column.push( {text:'Apple',text: '100 grams',text: '52'});
//   //         column.push( {text:'Apple',text: '100 grams',text: '52'});

//   //  var docDefinition = {
//   //   content: [
//   //     {
//   //       text: 'Reporte de Entregas de Cliente '+entregas[0].cliente.nombres+' '+entregas[0].cliente.apellidos
//   //     },
//   //     {
//   //       style: 'demoTable',
//   //       table: {
//   //         widths: ['*', '*', '*'],
//   //         headerRows: 1,
//   //         body: [
//   //           [{text: 'Fecha de Entrega', style: 'header'}, {text: 'Cantidad', style: 'header'},
//   //             {text: 'Entrega ID', style: 'header'}
//   //           ],
//             for (var i=0; i <entregas.length; i++){

//                column.push({ Fecha: entregas[i].fecha_entrega ,Cantidad: entregas[i].cantidad ,Id: entregas[i].EntregaId, width: 80 });
              
//   //           //   [''+entregas[i].fecha_entrega,''+entregas[i].cantidad,''+entregas[i].EntregaId],

//             }
            
//   //          column,
          
//   //           // ['Apple', '100 grams', '52'],
//   //           // ['Bananas', '100 grams', '89'],
//   //           // ['Guava', '100 grams', '68'],
//   //           // ['Lemon', '100 grams', '29'],
//   //           // ['Mangos', '100 grams', '60'],
//   //           // ['Orange', '100 grams', '47'],
//   //           // ['Strawberries', '100 grams', '33']
//   //         ]
//   //       }
//   //     }
//   //   ],
//   //   styles: {
//   //     header: {
//   //       bold: true,
//   //       color: '#000',
//   //       fontSize: 11
//   //     },
//   //     demoTable: {
//   //       color: '#666',
//   //       fontSize: 10
//   //     }
//   //   }
//   // };             
//   var externalDataRetrievedFromServer = [
//     { Fecha: 'Bartek', Cliente : 34 , style: 'subheader'},
//     { Fecha: 'John', Cliente: 27 },
//     { Fecha: 'Elizabeth', Cliente: 30 },
            
// ];

// function buildTableBody(data, columns) {
//     var body = [];

//     body.push(columns);

//     data.forEach(function(row) {
//         var dataRow = [];

//         columns.forEach(function(column) {
//             dataRow.push(row[column].toString());
//         })

//         body.push(dataRow);
//     });

//     return body;
// }

// function table(data, columns) {
//     return {
//         table: {
//             headerRows: 1,
//             style: 'tableExample',
//             body: buildTableBody(data, columns)
//         }
//     };
// }

// var dd = {
//     content: [
//         { text: 'Reporte de Entrega de Cliente', style: 'header' },
         
//         table(column, ['Fecha', 'Cantidad','Id']),

//     ],
//     styles: {
//       header: {
//         bold: true,
//         color: '#000',

//         fontSize: 11
//       },
//       subheader: {
//         color: '#000',
//         fontSize: 15,
//       },
//       tableExample: {
//       margin: [0, 5, 0, 15]
//     },
//     },
    

// };




//     pdfMake.createPdf(dd).open();           // console.log(respuesta);
//                // refresh();
// });



    
//   };
        
        //$scope.recibirDatos= func
$scope.generarpqt = function() { 

var faker = window.faker;
var base64Img = null;

var examples = {};
//var columns = ["ID", "Name", "Email", "City","Expenses"];
 var columns =[];
 var data =[];
//  var data = [
//      [1, "Jonathan", 25, "Gothenburg"],
//      [2, "Simon", 23, "Gothenburg"],
//       [3, "Hanna", 21, "Stockholm"]
//   ];
 
  //var doc = new jsPDF('p', 'pt');
  // Returns a new array each time to avoid pointer issues
// Returns a new array each time to avoid pointer issues
var getColumns = function () {
    return [
        {title: "Id", dataKey: "id"},
        {title: "Fecha Entrega", dataKey: "fecha"},
        {title: "Cantidad", dataKey: "cantidad"}
        // {title: "City", dataKey: "city"},
        // {title: "Expenses", dataKey: "expenses"}
    ];
};
  
 // Uses the faker.js library to get random data.
function getData(rowCount) {
   // rowCount = rowCount || 4;
   
 $http.get("http://localhost:3001/entregas/cliente/"+$scope.cliente._id)
            .success(function(entregas){
              //console.log(entregas);
             var data = []; 
              for (var i = 0; i < entregas.length; i++) {
                  data.push({
                      id: ''+entregas[i].EntregaId,
                      fecha: ''+entregas[i].fecha_entrega,
                      cantidad: ''+entregas[i].cantidad
                      // country: faker.address.country(),
                      // city: faker.address.city(),
                      // expenses: faker.finance.amount(),
                      // text: shuffleSentence(sentence),
                      // text2: faker.lorem.words(1)
                  });
              }
              return data;

            });
             
   
    //var sentence = "Minima quis totam nobis nihil et molestiae architecto accusantium qui necessitatibus sit ducimus cupiditate qui ullam et aspernatur esse et dolores ut voluptatem odit quasi ea sit ad sint voluptatem est dignissimos voluptatem vel adipisci facere consequuntur et reprehenderit cum unde debitis ab cumque sint quo ut officiis rerum aut quia quia expedita ut consectetur animiqui voluptas suscipit Monsequatur";
    // var sentence = faker.lorem.words(20);
   
}

function shuffleSentence(words) {
    if (typeof words === 'string') return words;
    words = words || faker.lorem.words(8);
    var str = faker.helpers.shuffle(words).join(' ').trim();
    return str.charAt(0).toUpperCase() + str.slice(1);
}

imgToBase64('document.jpg', function(base64) {
    base64Img = base64;
}); 
// You could either use a function similar to this or pre convert an image with for example http://dopiaza.org/tools/datauri
// http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
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
 var doc = new jsPDF();

 // doc.autoTable(columns, data);
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

    doc.autoTable(getColumns(), getData(40), {
        addPageContent: pageContent,
        margin: {top: 30}
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
    }

    //return doc;
   
    doc.save("table.pdf");
    //doc.save('table.pdf');
}


  
})