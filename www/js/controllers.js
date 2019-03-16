angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $state, firebase) {
  let firebaseUser = firebase.auth().currentUser;

  if (firebaseUser) {
    console.log("Signed in as:", firebaseUser.uid);
  } else {
    console.log("Signed out");
    $state.go("login");
  }
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope, $state, firebase) {
  let vm = this;

  vm.doLogin = doLogin;
  
  function doLogin(){
    firebase.auth().signInWithEmailAndPassword(vm.email, vm.password)
    .then(function(firebaseUser) {
      console.log(firebaseUser);
      $state.go("tab.dash");
    }).catch(function(error){
      alert(error.message);
    })
  }
});
