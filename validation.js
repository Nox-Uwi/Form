$(document).ready(function() {
    // Handle textarea 'not-empty' class addition/removal
    const textareas = $('.message-box textarea');

    textareas.each(function() {
        if ($(this).val().length > 0) {
            $(this).addClass('not-empty');
        }
    });

    textareas.on('input', function() {
        if ($(this).val().length > 0) {
            $(this).addClass('not-empty');
        } else {
            $(this).removeClass('not-empty');
        }
    });

    // jQuery Validation
    $("#contact-us").validate({
        rules: {
            fname: {
                minlength: 4,
                maxlength: 15
            },
            email: {
                email: true
            },
            message: {
                minlength: 20
            }
        },
        messages: {
            fname: {
                minlength: "Your name must be at least 4 characters long",
                maxlength: "Your name must be less than 15 characters"
            },
            email: {
                email: "Please enter a valid email address"
            },
            message: {
                minlength: "Your message must be at least 20 characters long"
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element); // Position the error message after the input element
        },
        submitHandler: function(form, event) {
            event.preventDefault(); 
            sent(form);
        },
        invalidHandler: function(event, validator) {
            alert("Form validation failed. Please check all the inputs are correct...");
        }
    });

    // Custom behavior to remove validation warnings on focusout
    $("input, textarea").focusout(function() {
        $(this).valid();  // Trigger validation on this field
        $(this).removeClass('error'); // Remove error class
        $(this).next('.error').remove(); // Remove error message
    });
});

function sent(form) {
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbyPWcmdycojDQU61Wd__S-FGfcRN_KkJHzK7B2mgwL-a5Hx0A8vnOnUeW8aL8SkcNJy2g/exec",
        data: $(form).serialize(),
        method: "post",
        success: function(response) {
            alert("Form submitted successfully");
            window.location.reload(); // Reload the page after successful submission
        },
        error: function(err) {
            alert("Something went wrong");
        }
    });
}
