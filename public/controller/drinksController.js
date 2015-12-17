var grogApp = angular.module('grogApp', ['ngRoute']);


grogApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/view/:index', {
            templateUrl: '/drink_Partials/DrinkDetail.html',
            controller: 'editDrink'
        }).
        when('/new/', {
            templateUrl: '/drink_Partials/NewDrink.html',
            controller: 'newDrinkController'
        }).
        when('/', {
            templateUrl: '/drink_Partials/DrinkDirectory.html',
            controller: 'drinkController'
        })
    }]);

grogApp.service("drinkService",function(){
	var drinks = [];
	var setdrinks = function(list)
	{
		drinks = list;
	} 
	var getdrinks = function(){
		return drinks;
	}
	return	{	
		setdrinks: setdrinks,
		getdrinks: getdrinks
	};
});


grogApp.factory('Ingredients', ['$http', function($http){
    return $http.get('/store/ingredients');

}])


grogApp.controller('newDrinkController', ['$http', '$scope', 'Ingredients', function($http, $scope,Ingredients){


   
    

     Ingredients.success(function(data){
        // ingredientService.setIngredients = data;
        $scope.allIngredients = data;
        console.log(data);
    }).error(function(data, status){
        console.log(data, status);
        $scope.allIngredients = [];
    });


    $scope.addIngredientObject = function()
    {
        

        $scope.ingredients.push({amount:0,name:""});

    }
    $scope.addInstructionsString = function()
    {
        console.log($scope.instructions);
                if (!$scope.drink)
                    $scope.drink = {};
        if (!$scope.drink.instructions)
            $scope.drink.instructions = [{text:""}];
        $scope.instructions.push({text:""});
        
        

    }

    $scope.addDrink = function(){
        console.log($scope.ingredients);
    $scope.drink = {
        name:$scope.drink.name, 
        author:$scope.drink.author,
        description:$scope.drink.description,
        ingredients:$scope.ingredients,
        instructions:$scope.instructions
         };

         console.log($scope.drink);

        $http({
            method: 'POST',
            url: '/store/drinks/',
            data: $scope.drink
        }).then(function successCallback(response) {
    // this callback will be called asynchronously
    console.log(response.data);
    $scope.id = response.data._id
}, function errorCallback(response) {
    console.log(response);
    // or server returns response with an error status.
});

    }


}])

grogApp.controller("editDrink",['$route','$http','$scope', 'drinks', '$routeParams','Ingredients', function ($route,$http,$scope, drinks,$routeParams, Ingredients) {
    		// var index = $routeParams.index


   Ingredients.success(function(data){
        // ingredientService.setIngredients = data;
        $scope.allIngredients = data;
        console.log(data);
    }).error(function(data, status){
        console.log(data, status);
        $scope.allIngredients = [];
    });


            $scope.addIngredientObject = function()
    {
        console.log($scope.drink);
        if (!$scope.drink.ingredients)
            $scope.drink.ingredients = [];
        else
            $scope.drink.ingredients.push({amount:0,name:""});
            

        if (!$scope.allIngredients)
        {
       Ingredients.success(function(data){
        // ingredientService.setIngredients = data;
        $scope.allIngredients = data;
        console.log(data);
    }).error(function(data, status){
        console.log(data, status);
        $scope.allIngredients = [];
    });
        }

    }
    $scope.addInstructionsString = function()
    {
        console.log($scope.drink);
        if (!$scope.drink.instructions)
            $scope.drink.instructions = [];
        else
            $scope.drink.instructions.push("");

    }

            $scope.deleteDrink = function()
            {

                $http({
                    method: 'DELETE',
                    url: '/store/drinks/'+$scope.drink._id,
                }).then(function successCallback(response) {
    // this callback will be called asynchronously
    alert("Successful Delete")
    location.reload();
    
    
}, function errorCallback(response) {
    alert("Error on Delete")
    // or server returns response with an error status.
});
            }
            $scope.editDrink = function(){

                var drink = {
        _id:$scope.drink._id,                
        name:$scope.drink.name, 
        author:$scope.drink.author,
        description:$scope.drink.description,
        ingredients:$scope.drink.ingredients,
        instructions:$scope.drink.instructions
         };

                console.log(drink);
                $http({
                    method: 'POST',
                    url: '/store/drinks/'+$scope.drink._id,
                    data: drink
                }).then(function successCallback(response) {
    // this callback will be called asynchronously
    alert("Succesful Edit")
    console.log(response);
    location.reload();
    
    
}, function errorCallback(response) {
    console.log(response);
    alert("Error, Please check your form.");
    location.reload();
    // or server returns response with an error status.
});

            }


            $scope.drink = drinks.success(function(data) {
               console.log(data);
               $scope.drink = data[$routeParams.index];
               console.log($scope.drink);
           })
        }])


grogApp.controller('metaController', function ($scope) {
  $scope.version='0.0.1';
})




grogApp.factory('drinks', ['$http', function($http){
	return $http.get('/store/drinks');

}])

    // Controller
    grogApp.controller('drinkController', ['$scope', 'drinks','Ingredients', function ($scope, drinks,Ingredients) {
      
              Ingredients.success(function(data){
        // ingredientService.setIngredients = data;
        $scope.allIngredients = data;
        console.log(data);
    }).error(function(data, status){
        console.log(data, status);
        $scope.allIngredients = [];
    });

      drinks.success(function(data){
      	// drinkService.setdrinks = data;
        $scope.drinks = data;
        console.log(data);
    }).error(function(data, status){
        console.log(data, status);
        $scope.drinks = [];
    });
}])