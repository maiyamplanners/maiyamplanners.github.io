$(function() {
	$("#contactForm input,#contactForm textarea").jqBootstrapValidation({
		preventSubmit: true,
		submitError: function($form, event, errors) {
			// Me be alert ?
		},
		submitSuccess: function($form, event) {
			event.preventDefault(); // prevent default submit behaviour
			// get values from FORM
			var $form_data = $("#contactForm").serialize();
			var $form_action = $('#contactForm').attr('action');
			$this = $("#sendMessageButton");
			$this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
			$.ajax({
				url: $form_action,
				type: "POST",
				data: $form_data,
				success: function(data) {
					showSuccess();
					$('#contactForm').trigger("reset");
				},
				error: function(data) {
					if(data.status == 0){
						showSuccess();
					}
					else {
						// Fail message
						$('#success').html("<div class='alert alert-danger'>");
						$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
						.append("</button>");
						$('#success > .alert-danger').append($("<strong>").text("Sorry, it seems that my mail server is not responding. Please try again later!"));
						$('#success > .alert-danger').append('</div>');
					}
					//clear all fields
					$('#contactForm').trigger("reset");
				},
				complete: function() {
					setTimeout(function() {
						$this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
					}, 1000);
				}
			});
		},
		filter: function() {
			return $(this).is(":visible");
		},
	});

	var showSuccess = function() {
		// Success message
		$('#success').html("<div class='alert alert-success'>");
		$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
		$('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
		$('#success > .alert-success').append('</div>');
	};

	$("a[data-toggle=\"tab\"]").click(function(e) {
		e.preventDefault();
		$(this).tab("show");
	});
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
	$('#success').html('');
});
