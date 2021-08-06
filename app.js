var app = angular.module("studApp", ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home.html',
        controller: 'homeController'
    }).when('/add', {
        templateUrl: 'add.html',
        controller: 'addController'
    }).when("/edit", {
        templateUrl: 'edit.html',
        controller: 'editController'
    });
}]);