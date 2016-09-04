var app = angular.module('app', ['dependencies']);
app.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {

        // Set some reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // GLOBAL APP SCOPE
        $rootScope.app = {
            name: 'Angular template', // name of your project
            author: 'Grekulov Valentyn', // author's name or company name
            description: 'Some template', // brief description
            version: '1.0', // current version
            year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
            isMobile: (function () {// true if the browser is a mobile device
                var check = false;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    check = true;
                }
                return check;
            })(),
            defaultLayout: {
                isNavbarFixed: false, //true if you want to initialize the template with fixed header
                logo: 'assets/images/logo.png' // relative path of the project logo
            },
            layout: ''
        };
        $rootScope.app.layout = angular.copy($rootScope.app.defaultLayout);
        $rootScope.user = {
            name: 'Valentyn',
            job: 'ng-Dev',
            picture: ''
        };
    }]);

