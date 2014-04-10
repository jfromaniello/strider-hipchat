(function() {
  app.controller('HipchatController', [
    '$scope', function($scope) {
      $scope.options = $scope.pluginConfig('hipchat') || {};
      $scope.saving = false;
      return $scope.save = function() {
        $scope.saving = true;
        return $scope.pluginConfig('hipchat', $scope.options, function() {
          return $scope.saving = false;
        });
      };
    }
  ]);

}).call(this);
