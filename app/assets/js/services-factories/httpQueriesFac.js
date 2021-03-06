app.config(['$httpProvider', function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['Content-Type']; //Fixes cross domain requests
}]);

app.factory('httpGetQuery', ['$q', '$http', function($q, $http) {
    return {
        getData: function(url) {
            var delay = $q.defer();
            $http.get(url)
                .success(function(data) {
                    delay.resolve(data);
                }).error( function(data) {
                    delay.reject('Unable to fetch the item' + data);
                });
            return delay.promise; //need compulsory to return it
        }
    };
}]);
app.factory('httpPostQuery', ['$q', '$http', '$cookies', '$rootScope', function($q, $http, $cookies, $rootScope) {
    return {
        postData: function(url, sendData) {
            var delay = $q.defer();
            $http.post(url, sendData, {
                withCredentials: false
            })
                .success(function(data) {
                    delay.resolve(data);
                    $cookies.put('welcomeOnBoard', 'true');
                }).error( function(data) {
                    delay.reject('Unable to fetch the item' + data);
                    $cookies.put('welcomeOnBoard', 'false');
                    $rootScope.$emit("CheckWelcomeOnBoardStatus", {});
                });
            return delay.promise;
        }
    };
}]);
app.factory('httpPutQuery', ['$q', '$http', function($q, $http) {
    return {
        putData: function(url, sendData) {
            var delay = $q.defer();
            $http.put(url, sendData, {
                withCredentials: false
            })
                .success(function(data) {
                    delay.resolve(data);
                }).error( function(data) {
                    delay.reject('Unable to fetch the item' + data);
                });
            return delay.promise;
        }
    };
}]);