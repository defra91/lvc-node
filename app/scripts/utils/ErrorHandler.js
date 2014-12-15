'use strict';

angular.module('utils')
.factory('ErrorHandler', ["$rootScope", "$location", "FlashMessage",

	function ($rootScope, $location, FlashMessage) {
		var isLoginRequired = function(error) {
			if (error.data.code === 1001) {
				return true;
			} else {
				return false;
			}
		};
		
		var isLogoutRequired = function(error) {
			if (error.data.code === 1002) {
				return true;
			} else {
				return false;
			}
		};
		
		var handle = function(error) {

			console.log(error);

			var message = { type: "danger" };

			if (error.status === 0) {
				// È stata interrotta la connessione
				message.title = "Connection refused";
				message.message = "Please check your Internet connection";
			} else {
				if (error.data.title !== undefined) {
					// È arrivato un errore da MaaP
					message.title = error.data.title;
					message.message = error.data.message;
					message.details = error.data.details;
				} else {
					// È arrivato un errore inatteso
					console.log("ErrorHandler received an unexpected error:", error);
					message.title = "Error " + error.code;
					message.message = error.data;
				}
			}

			if (isLoginRequired(error)) {
				FlashMessage.future(message);
				$location.path("/login");
				return;
			}

			if (isLogoutRequired(error)) {
				FlashMessage.future(message);
				$location.path("/");
				return;
			}

			FlashMessage.set(message);
		};
		
		return {
			isLoginRequired: isLoginRequired,
			handle: handle
		};
	}
]);
