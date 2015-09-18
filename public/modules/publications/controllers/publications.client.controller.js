'use strict';

// Publications controller
angular.module('publications').controller('PublicationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Publications',
	function($scope, $stateParams, $location, Authentication, Publications) {
		$scope.authentication = Authentication;

		// Create new Publication
		$scope.create = function() {
			// Create new Publication object
			var publication = new Publications ({
				name: this.name
			});

			// Redirect after save
			publication.$save(function(response) {
				$location.path('publications/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Publication
		$scope.remove = function(publication) {
			if ( publication ) { 
				publication.$remove();

				for (var i in $scope.publications) {
					if ($scope.publications [i] === publication) {
						$scope.publications.splice(i, 1);
					}
				}
			} else {
				$scope.publication.$remove(function() {
					$location.path('publications');
				});
			}
		};

		// Update existing Publication
		$scope.update = function() {
			var publication = $scope.publication;

			publication.$update(function() {
				$location.path('publications/' + publication._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Publications
		$scope.find = function() {
			$scope.publications = Publications.query();
		};

		// Find existing Publication
		$scope.findOne = function() {
			$scope.publication = Publications.get({ 
				publicationId: $stateParams.publicationId
			});
		};
	}
]);