var grogApp = angular.module('grogApp', ['ngRoute']);


grogApp.factory('getAllValves', ['$http', function($http){
    return $http.get('/app/getValves');

}])


grogApp.controller('valveController', ['$http', '$scope', 'getAllValves', function($http, $scope,metaData){
    console.log("Loading Valves.");
    allValves.success(function(data){
        // ingredientService.setIngredients = data;
        $scope.allValves = data;
        console.log("Succesfully fetched valves");
    }).error(function(data, status){
        console.log(data, status);
        $scope.allValves = {};
    });

}])