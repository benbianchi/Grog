var grogApp = angular.module('grogApp', ['ngRoute']);



grogApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/view/:index', {
            templateUrl: '/browse_Partials/browseDetail.html',
            controller: 'viewDetailedController'
        }).
        when('/', {
            templateUrl: '/browse_Partials/browseAll.html',
            controller: 'browseAllController'
        })
    }]);



grogApp.controller('metaController', function ($scope) {
  $scope.version='0.0.1';
});

grogApp.factory('availableDrinksFactory', ['$http', function($http){

	return $http.get("/store/getAvailableDrinks/");

}])

grogApp.factory('availableDrinksFactory', ['$http', function($http){

	return $http.get("/store/getAvailableDrinks/");

}])

grogApp.factory('ingredientNameFactory', ['$http', function($http){


	return $http.get("/store/ingredients/");

}]);



grogApp.controller('viewDetailedController', ["$scope","$routeParams", "availableDrinksFactory","ingredientNameFactory", function ($scope,$routeParams,availableDrinksFactory,ingredientNameFactory) {
	

	console.log($routeParams.index);
	


	ingredientNameFactory.success(function(ingrdata){
      	
        $scope.ingredients = ingrdata;


     
        console.log($scope.ingredients);
    }).error(function(ingrdata, status){
        console.log(ingrdata, status);
        $scope.allDrinks = [];
    });





	availableDrinksFactory.success(function(data){
      	
        $scope.drink = data[$routeParams.index]


	ingredientNameFactory.success(function(ingrdata){
      	
        $scope.ingredients = ingrdata;

        for (var i = 0; i < $scope.drink.ingredients.length; i++) {
        	for (var j = 0; j < $scope.ingredients.length; j++) {
        		if ($scope.drink.ingredients[i].Type == $scope.ingredients[j]._id)
        		{
        		$scope.drink.ingredients[i]["name"] = $scope.ingredients[j].name 	
        		console.log($scope.ingredients[j].name);

        		}
        	};
        };
     
        console.log($scope.ingredients);
    }).error(function(ingrdata, status){
        console.log(ingrdata, status);
        $scope.allDrinks = [];
    });

     
        console.log($scope.drink);
    }).error(function(data, status){
        console.log(data, status);
        $scope.allDrinks = [];
    });


    	$scope.replace = function(index)
    	{
    		console.log(index);
    		ingredientNameFactory.success(function(ingrdata){
      	
        $scope.ingredients = ingrdata;


    		for (var i = 0; i < $scope.ingredients.length; i++) {
    			if ($scope.ingredients[i]._id == index)
    			{
    				console.log("yay");
    				$scope.ingredients=$scope.ingredients[i];
    			}

    		};
     
     
    }).error(function(ingrdata, status){
        console.log(ingrdata, status);
        $scope.allDrinks = [];
    });


    	}

 
    
  
}]);


grogApp.controller('browseAllController',['$scope', '$http','availableDrinksFactory' , function ($scope,$http,availableDrinksFactory) {

	availableDrinksFactory.success(function(data){
      	// drinkService.setdrinks = data;
        $scope.availableDrinks = data;
        console.log(data);
    }).error(function(data, status){
        console.log(data, status);
        $scope.availableDrinks = [];
    });


     	$scope.select = function(index)
 	{
 		$scope.selectedDrink = $scope.availableDrinks[index];
 		console.log($scope.selectedDrink);
 	}



}]);
