angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/ips', {
			templateUrl: 'views/ip.html',
			controller: 'IPController'
		})

		.when('/ipcounts', {
			templateUrl: 'views/ipCount.html',
			controller: 'IPCountController'	
		});
		$routeProvider.otherwise('/');

	$locationProvider.html5Mode(true);

}]);