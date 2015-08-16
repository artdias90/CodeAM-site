var codeAMSite = angular.module('codeAMSite', [
    'sp.services',
    'sp.directives',
    'ui.router',
    'toastr']);

codeAMSite.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider','$httpProvider', 'toastrConfig',
    function($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $httpProvider, toastrConfig) {
        $compileProvider.debugInfoEnabled(environment == 'production' ? false : true);
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/partials/screen_home.html',
                controller: 'HomeCtrl'
            })
            .state('contact-form', {
                url: '/contact-form',
                templateUrl: '/partials/screen_contact_form.html',
                controller: 'ContactFormCtrl'
            });
        $urlRouterProvider.otherwise("/");

        angular.extend(toastrConfig, {
            positionClass: 'toast-top-full-width'
        });

        // set html5 mode
        $locationProvider.html5Mode({
            enabled: true,
            hashPrefix: '!',
            requireBase: false
        });
    }]);

codeAMSite.run(['$rootScope', '$state',
    function($rootScope, $state) {
        // global object cache
        $rootScope.objectCache = [];

        //call $rootScope.showPageLoading(true); whenever you want the full page loading indicator
        $rootScope.showPageLoading = function(state) {
            $rootScope.loading = state;
        };
    }]);

codeAMSite.controller('HeaderCtrl', ['$scope',function($scope) {

    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    }


    function elmYPosition(eID) {
        var elm = document.getElementById(eID);
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }

    $scope.scrollDown = function (eID) {
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 30);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    };

}]);

codeAMSite.controller('HomeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.onLandingPage = true;
}]);

codeAMSite.controller('ContactFormCtrl', ['$scope', '$rootScope', '$state', '$http', 'toastr', function($scope, $rootScope, $state, $http, toastr) {
    $rootScope.onLandingPage = false;
    $scope.sendDisabled = false;
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    $scope.sendContactForm = function(contact) {
    };

}]);