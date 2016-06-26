var grogApp = angular.module('grogApp', ['ngRoute']);


grogApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/statistics', {
            templateUrl: '/pages/nav/statistics.html',
            controller: ''
        }).
        when('/admin/', {
            templateUrl: '/pages/nav/admin.html',
            controller: ''
        }).
        when('/admin/valve/:index', {
            templateUrl: '/pages/valve/main.html',
            controller: ''
        }).
        when('/admin/ingredient/:index', {
            templateUrl: '/pages/nav/admin.html',
            controller: ''
        }).
        when('/admin/drink/', {
            templateUrl: '/pages/nav/admin.html',
            controller: ''
        }).
        when('/', {
            templateUrl: '/pages/nav/main.html',
            controller: ''
        })
    }]);


grogApp.factory('metaData', ['$http', function($http){
    return $http.get('/app/MetaData');

}])


grogApp.controller('metaDataCtrl', ['$http', '$scope', 'metaData', function($http, $scope,metaData){
    
    metaData.success(function(data){
        // ingredientService.setIngredients = data;
        $scope.metaData = data;
        console.log("Succesfully fetched Metadata");
    }).error(function(data, status){
        console.log(data, status);
        $scope.metaData = {};
    });

}])


grogApp.factory('getAllValves', ['$http', function($http){
    return $http.get('/store/valves');

}])


grogApp.controller('valveController', ['$http', '$scope', 'getAllValves', function($http, $scope,getAllValves){
    console.log("Loading Valves.");
    getAllValves.success(function(data){
        
        $scope.allValves = data;
        console.log("Succesfully fetched valves");
    }).error(function(data, status){
        console.log(data, status);
        $scope.allValves = {};
    });

    $scope.createValve = function(){
        var valv = {amount:0, type:""}
        $scope.allValves.push(valv)
    };

    $scope.selectValve = function(i){
        activeValve = 
    }
}])