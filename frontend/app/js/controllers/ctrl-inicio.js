app.controller('ctrl-inicio', function($scope,$rootScope) {


var route_frontend = "http://localhost:9000/";
// var route_frontend = "https://aurelis-frontend.herokuapp.com/";
// var route_backend = "http://localhost:3001/";
// var route_backend = "https://aurelis-backend.herokuapp.com/";
  if (localStorage.getItem("username") !== null) {
    //console.log("si existe variable de sesion" + localStorage.getItem("username"));
    $rootScope.username = localStorage.getItem("username");
    document.getElementById("cont").value = 1200;
  }
  else{

  //console.log("no existe variable de sesion");
  window.location = route_frontend;
  } 


 // $scope.logout = function(){
     
 //      window.localStorage.clear();
 //      window.location = route_frontend;
        
 // };
    
});