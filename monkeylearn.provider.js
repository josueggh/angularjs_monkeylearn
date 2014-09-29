(function(window, angular, undefined) {
  'use strict';


  // $idle service and provider
  function $MonkeyProvider() {
    var token = '';
    var avaliableMethods = null;
    var publicUrl = 'https://api.monkeylearn.com/api/v1/categorizer/';

    this.setToken = function( user_token ){
      token = user_token;
    };

    this.setMethods = function( methods ){
      avaliableMethods = methods;
    }

    this.getToken = function(){
      console.log(token);
    };
   
    this.$get = ['$http' ,'$q' , function($http ,$q) {

      var monkey = {
        
        getToken: function() {
          return token;
        },
        
        getUrl : function( method ){
          return publicUrl+method+'/classify_text/';
        },

        classifyText : function( method , text ){
          if( avaliableMethods[method] === undefined)
            return false;
          
          var url = this.getUrl( avaliableMethods[method] );
          var defer = $q.defer();

          $http.post(
              url,
              { text : text },
              { headers: { 'Authorization': 'token '+token } }
          ).success( function( data ){
              defer.resolve(data);
          }).error( function(){
              defer.reject('There was an error');
          });

          return defer.promise;
        }
       
      };

      return monkey;
    }];
  }

  angular.module('ngMonkeylearn.monkeyprovider', [])
    .provider('$monkey', $MonkeyProvider);


  angular.module('ngMonkeylearn', [ 'ngMonkeylearn.monkeyprovider']);

})(window, window.angular);