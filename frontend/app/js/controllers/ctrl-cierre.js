'use strict';

app.controller('ctrl-cierre', function($scope,Cierre,ngProgress) {

$scope.cierre = new Cierre();

var refresh = function() {
  $scope.cierres = Cierre.query(); 
  //$scope.cierre ="";
}
refresh();

$scope.add = function(cierre) {
  console.log(cierre);
  Cierre.save(cierre,function(cierre){
  	
   //refresh();
   $scope.cierre = Cierre.get({ id: cierre._id });
  });
};
$scope.update = function(cierre) {
  $scope.cierre.$update(function(cierreUpdated){
  	
  	refresh();
  });
};

$scope.remove = function(cierre) {
 cierre.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.cierre = Cierre.get({ id: id });
};  

$scope.deselect = function() {
  $scope.cierre = "";
}

})





	app.controller('ctrlModalPagos', function($scope){
		$scope.personas=[{
		ref: '1234',
		banco: 'Bancaribe',
		titular: 'Juana',
		monto: 15000
	}, {
		ref: 'V-20.153.333',
		banco: 'Juana Magallanes',
		titular: '+58 0414-8897458',
		monto: 'una casa, al lado de una referencia zona tal urb tal'
	}, {
		ref: 'V-20',
		banco: 'Joao Da Silva',
		titular: '+58 0414-8897458',
		monto: 'una casa, al lado de una referencia zona tal urb tal'
	}, {
		ref: 'V-20.153.333',
		banco: 'Pedro Perez',
		titular: '+58 0414-8897458',
		monto: 'una casa, al lado de una referencia zona tal urb tal'
	}, {
		ref: 'V-20.153.333',
		banco: 'Maria Clavento',
		titular: '+58 0414-8897458',
		monto: 'una casa, al lado de una referencia zona tal urb tal'
	}, {
		ref: 'V-20.153.333',
		banco: 'Juan',
		titular: '+58 0414-8897458',
		monto: 'una casa, al lado de una referencia zona tal urb tal'
	}, {
		ref: 'V-20.153.333',
		banco: 'Luis Fonsi',
		titular: '+58 0414-8897458',
		monto: 'una casa, al lado de una referencia zona tal urb tal'
	}];

	$scope.eliminar = function(row) {
		if (confirm("¿Seguro que desea eliminar?")) {
		$scope.personas.splice(row, 1);
		}
  	};

  	$scope.agregar = function() {
		$scope.personas.push({
		ref: '',
		banco: '',
		titular: '',
		monto: ''
		})
  	};
});

