'use strict';

/**
 * @ngdoc overview
 * @name tp2App
 * @description
 * # tp2App
 *
 * Main module of the application.
 */
angular
  .module('tp2App', [
    'ngResource'
  ])
  .factory('MyFactoryCompte', function ($resource) {
     return $resource('https://hialmar-banque.herokuapp.com/compte/:id', { id: '@_id' }, {
        update: {
          method: 'PUT' // this method issues a PUT request
        }
      });
  })
  .controller('MainCtrl',
  function ($scope, MyFactoryCompte) {
    $scope.resultat = '';
    $scope.obj = { id : '0', somme : '0' };
    $scope.creerCompte = function() {
      var objToSave = new MyFactoryCompte();
      objToSave.id = $scope.obj.id;
      objToSave.somme = $scope.obj.somme;
      objToSave.$save(function(savedObj) {
        $scope.resultat = savedObj;
       }, function(error) {
        $scope.resultat = error.data.error;
       });
    };

    $scope.position = function() {
      MyFactoryCompte.get({ id: $scope.obj.id }, function(retour) {
        $scope.resultat = retour;
      }, function(error) {
        $scope.resultat = error.data.error;
       });
    };

    $scope.crediter = function() {
      //alert('test credit');
      MyFactoryCompte.update({ id:$scope.obj.id }, $scope.obj, function(savedObj) {
        $scope.resultat = savedObj;
       }, function(error) {
        $scope.resultat = error.data.error;
       });
    };

    $scope.debiter = function() {
      //alert('test débit');
      var obj = { id : $scope.obj.id, somme : $scope.obj.somme };

      if(obj.somme > 0) obj.somme = - obj.somme;
      MyFactoryCompte.update({ id:obj.id }, obj, function(savedObj) {
        $scope.resultat = savedObj;
       }, function(error) {
        $scope.resultat = error.data.error;
       });
    };

  });

