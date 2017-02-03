$(function(){
	var WorkoutLog = (function($, undefined) {
		var API_BASE = "http://localhost:3000/api/";
		var userDefinitions = [ ];

		var setAuthHeader = function(sessionToken) {
			window.localStorage.setItem("sessionToken", sessionToken);
			//set the authorization header
			//This can be done on individual calls
			//here we showcase ajaxsetup as a global tool
			$.ajaxSetup({
				"headers": {
					"Authorization": sessionToken
				}
			});
		};

// 		//public
		return {
			API_BASE: API_BASE,
			setAuthHeader: setAuthHeader
		};

	})(jQuery);

// 	//Ensure .disabled aren't clickable
	$(".nav-tabs a[data-toggle=tab]").on("click", function(e) {
		var token = window.localStorage.getItem("sessionToken");
		if ($(this).hasClass("disabled") && !token) {
			e.preventDefault();
			return false;
		}
	});

// 	//bind tab change events
	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
		var target = $(e.target).attr("href"); //activated tab
		if (target === "#log") {
			WorkoutLog.log.setDefinitions();
		}
		if (target  === "#history") {
		WorkoutLog.log.setHistory();
	}
});	
// 	//bind enter key
	$(document).on("keypress", function(e) {
		if (e.which === 13) { //enter key
			if ($("#signup-modal").is(":visible")) {
				$("#signup").trigger("click");
			}
			if ($("#login-modal").is(":visible")) {
				$("#login").trigger("click");
			}
		}
	});
	var token = window.localStorage.getItem("sessionToken");
	if (token) {
		WorkoutLog.setAuthHeader(token);
	}

	//expose this to the other workoutlog modules
	window.WorkoutLog = WorkoutLog;
});
// 	
// $("#testAPI").on("click", function(){
// 		console.log("It is working");
// 	});
// 	var test = $.ajax({
// 		type: "GET",
// 		url: "http://localhost:3000/api/test",
// 	});
// 	test.done(function(data){
// 		console.log(data);
// 	});
// 	test.fail(function(){
// 		console.log("Oh no!");
// 	});
// });