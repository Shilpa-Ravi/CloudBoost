angular.module('IPCountCtrl', []).controller('IPCountController', function($scope,$http,$window,$rootScope) {

	$scope.tagline = 'Total no of visitors: ';	
  $rootScope.getIP = function(){
    $http.get('/api/ip')
      .then(function (success){
      $rootScope.ipList= success.data.ipArr; //ip lists;
      //$rootScope.ipList.push($scope.ip.clientIp)
       console.log("ip",success);
       console.log("IP Arr",$rootScope.ipList);

     },function (error){

     });

  }
	
  $rootScope.getIP();
   $window.onbeforeunload = function (event) {

      $http.post('/api/ipRemove')
       .then(
           function(response){
             console.log("ipremove",response);
             // success callback
           }, 
           function(response){
             // failure callback
           }
      );
      
          return 'You have made changes, but you did not save them yet.\nLeaving the page will revert all changes.';
     
  }
});