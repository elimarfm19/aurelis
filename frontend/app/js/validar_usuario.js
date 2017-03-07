function validar_usuario($scope){

	if ($scope.username == 'admin' && $scope.password=='1234') {
      document.cookie = "comida_favorita=arroz; max-age=120";
      //$window.location.href('/freedor');
      //$location.path('/freedor');
      window.location = "http://localhost:9000/aurelis.html#/"

    }else{

      console.log('datos incorrectos');
    }
 
}
function readCookie(name) {

  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

}

function authenticated($localStorage){

	if ($localStorage.x) {
		console.log($localStorage.x);
	}
	else{
		console.log("cerre sesion");
	}	

	//delete $localStorage.x;	
}