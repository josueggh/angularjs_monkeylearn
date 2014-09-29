monkeyApp = angular.module('monkeyApp',['ngMonkeylearn'] );

/*
 * You must configure the Monkey Learn Provider before start using in your Application
 */
monkeyApp.config([ '$monkeyProvider', function( $monkeyProvider) {

  //Set your token
  $monkeyProvider.setToken( 'YOUR API KEY HER' );

  /* 
   * Set the available methods in your account
   * The structure of the object is : { 'ALIAS' : 'KEY '}
   */
  $monkeyProvider.setMethods( 
    {
      'retail_classify'   : 'YX4sJbxb' ,
      'lang_detection_v2' : 'oJNMkt2V' ,
      'topic_classifier'  : '5icAVzKR' ,
      'lang_detection_v1' : 'hDDngsX8' ,
    }
  );

}]);

/*
 * If you want to check if the token was correctly setting
 * you can do it with 'getToken' method.
 */
monkeyApp.run(['$monkey' , function( $monkey){
  console.log('Your token is : ' , $monkey.getToken() )
}]);


/* 
 * Controller for first example
 */

monkeyApp.controller('monkeyCtrl', ['$scope', '$monkey',
    function($scope,$monkey){
      
      $scope.text =  'Hello my friend. Are you looking for Monkey Learn?' ;

      $monkey.classifyText('lang_detection_v1' , $scope.text).then(
        function(data){
          $scope.response = data;
        }
      );

    }
]);

/* 
 * Controller for second example
 */
 
monkeyApp.controller('monkeyAdvancedCtrl', ['$scope', '$monkey' , '$http' ,
    function($scope,$monkey , $http){
      
      $scope.samples = [];
      $http.get('data/text.json').success( function(data){
          $scope.samples = data;
        }
      );

      $scope.setText = function(sample){
        $scope.text = sample;
      }

      $scope.classify = function( type ){
        
        $scope.response = null;
        $scope.error = null;

        if( $scope.text === undefined){
          $scope.error = 'Please write a text to classify';
          return false;
        }

        $monkey.classifyText( type  , $scope.text ).then(
          function(data){
            $scope.response = data;
          }
        );

      }


      

    }
]);
