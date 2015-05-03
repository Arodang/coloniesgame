
describe('myApp.profile', function() {
  beforeEach(function() {
    module('myApp');
    module('myApp.profile');
  });

  describe('ProfileCtrl', function() {
    var profileCtrl, $scope;
    beforeEach(function() {
      module(function($provide) {
        // comes from routes.js in the resolve: {} attribute
        $provide.value('user', {uid: 'test123'});
      });

      inject(function($controller) {
        $scope = {};
        profileCtrl = $controller('ProfileCtrl', {$scope: $scope});
      });
    });
    
    it('should define changePassword method', function() {
      expect(typeof $scope.changePassword).toBe('function');
    });

    it('should define changeEmail method', function() {
      expect(typeof $scope.changeEmail).toBe('function');
    });

    it('should define clear method', function() {
      expect(typeof $scope.clear).toBe('function');
    });
  });
});