#AngularJS + Monkey Learn

##Getting started

###Dependencies

The only required dependencie is [>AngularJS 1.2 or later](https://angularjs.org/) and have a [Monkey Learn Account](https://app.monkeylearn.com/accounts/register/).

###Files to download

You will need *monkeylearn.provider.js* *(minified coming soon)*.
Simply include it after AngularJS

    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="monkeylearn.provider.js"></script>
    

After create your Monkey Learn Account, the first step is get your API Token. You can find it if you go to the next URL :  [https://app.monkeylearn.com/accounts/user/settings/](https://app.monkeylearn.com/accounts/user/settings/).

###Configure

You will need to include the module as a dependency to your application module in your angular configuration.

    var monkeyApp = angular.module('monkeyApp',['ngMonkeylearn'] );

You should set your API Token and your available modules, the sctructure of the module is { ALIAS : KEY } , the ALIAS will be used to form the URL for text classification

    monkeyApp.config([ '$monkeyProvider', function( $monkeyProvider) {
    
      $monkeyProvider.setToken( 'YOUR API TOKEN HERE' );
    
      $monkeyProvider.setMethods( 
        {
          'retail_classify'   : 'YX4sJbxb' ,
          'lang_detection_v2' : 'oJNMkt2V' ,
          'topic_classifier'  : '5icAVzKR' ,
          'lang_detection_v1' : 'hDDngsX8' ,
        }
      );
    }]);
    
The **KEY** of your modules can be found in the URL or in the API Section of the specific module.
Take into account, that in the case of public modules, you must first install the modules in your account.

###Implement

The primary method is **classifyText** and receive two parameters. 

The first one is the *method* to use, in this case the script will do language detection, indicated by the previous alias **'lang_detection_v1'**.

The second is the text to classify.


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
    
You can find another implementation in the *example* directory

    cd angularjs_monkelearn/example
    python -m SimpleHTTPServer
