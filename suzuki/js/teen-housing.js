/** generates unique ID form submission **/
function makeID() {
    var value = document.getElementById("inputID").value;
    if (value === "") {
        document.getElementById("inputID").value = Math.random().toString(32).substr(2) + "_" + Math.random().toString(32).substr(2);
    }
}

/** main submit function, which triggers google & payment form submissions **/
function submit() {
    document.getElementById("container").style.display = "none";
    document.getElementById("container").style.visibility = "hidden";
    document.getElementById("post").style.display = "inherit";
    document.getElementById("post").style.visibility = "visible";
    $('html,body').scrollTop(0);
    window.parent.postMessage("scrollTop", '*');
    if (validate()) {
        $(".progress-bar").animate({
            width: "100%"
        }, 10000);
        submitGoogleForm();
        webHook();
        setTimeout(function(){
            submitPaymentForm();
        }, 10000);
    }
    else {
        document.getElementById("errorMessage").innerHTML = "<h3 style='color:red'>Please correct the issue(s) indicated below in order to complete your form submission!</h3><hr>";
        document.getElementById("container").style.display = "inherit";
        document.getElementById("container").style.visibility = "visible";
        document.getElementById("post").style.display = "none";
        document.getElementById("post").style.visibility = "hidden"
    }
}

/** web hook to Microsoft Teams **/
function webHook() {
    var url = "https://outlook.office.com/webhook/26a7efc0-83ae-498b-9804-aadcf71f0f6c@fa1ac8f6-5e54-4857-9f0b-4aa422c09689/IncomingWebhook/a2a3b5bb0d8b48179df41574149a5e6c/e4ae9ca5-eeac-4c99-ad5c-3fc1c29bece1";
    var firstName = $('input[id=inputFirstName]').val();
    var lastName = $('input[id=inputLastName]').val();
    var studentFirst = $('input[id=inputStudentFirstName]').val();
    var studentLast = $('input[id=inputStudentLastName]').val();
    var id = $('input[id=inputID]').val();
    var text = "<b>TEEN RESIDENCE HALL FORM SUBMISSION</b><br>" + firstName + " " + lastName + " has submitted a teen housing registration form for " + studentFirst + " " + studentLast + ".<br><i>(ID # " + id + ")</i>";
    $.ajax({
        data: JSON.stringify({
            "text": text
        }),
        dataType: 'json',
        type: 'POST',
        url: url
    });
}

/** submit google form **/
function submitGoogleForm() {
    // get the form data
    // there are many ways to get this data using jQuery (you can use the class or id also)
    var formData = {
        'entry.2039036389': $('input[id=inputFirstName]').val(),
        'entry.305040084': $('input[id=inputLastName]').val(),
        'entry.1583950870': $('input[id=inputAddress]').val(),
        'entry.1741944776': $('input[id=inputCity]').val(),
        'entry.1449597621': $('input[id=inputState]').val(),
        'entry.2043889500': $('input[id=inputZip]').val(),
        'entry.1770398499': $('input[id=inputPhoneNumber]').val(),
        'entry.303292725': $('input[id=inputEmailAddress]').val(),
        'entry.1732838863': $('input[id=inputStudentFirstName]').val(),
        'entry.1942983930': $('input[id=inputStudentLastName]').val(),
        'entry.1145530928': $('input[id=inputGender]').val(),
        'entry.507636254': $('input[id=inputAge]').val(),
        'entry.788277188': $('input[id=inputGraduation]').val(),
        'entry.1448907684': document.getElementById('inputAccommodations').value,
        'entry.310480582': $('input[id=inputID]').val()


    }
    // process the form
    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'https://docs.google.com/forms/d/e/1FAIpQLSdhZQe0Ji_BIqBAt-PDaqM4cPgw18blXGvvWgrVxmHHJPzTWQ/formResponse', // the url where we want to POST
        data        : formData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode          : true,
    })
    // using the done promise callback
        .done(function(data) {

        });
}

/** submits payment form **/
function submitPaymentForm() {
    var line0 = "<div id=\"" + "teen_dorm" + "\">";
    var line1 = "<input type=\"hidden\" name=\"PartNo\" value=\"" + "Teen Residence Hall Room" + "\">";
    var line2 = "<input type=\"hidden\" name=\"Item\" value=\"" + "Teen Residence Hall Room" + "\">";
    var line3 = "<input id=\"qty_teen_dorm\" type=\"hidden\" name=\"Qty\" value=" + 1 + ">";
    var line4 = "<input type=\"hidden\" name=\"Price\" value=" + price + ">";
    var line5 = "</div>";
    var formInputs = line0 + line1 + line2 + line3 + line4 + line5;

    document.getElementById("payFormInputs").innerHTML = formInputs;
    document.getElementById("payform").submit();
}

/** validates inputs on form **/
function validate() {
    clearValidateFeedback();
    var valid = true;

    // checks contact information
    var fields = ["FirstName", "LastName", "Address", "City", "State", "Zip", "PhoneNumber", "EmailAddress"];
    var names = ["first name", "last name", "street address", "city", "state/province", "zip code", "phone number", "email address"];
    for (var i = 0; i < fields.length; i ++) {
        var inputField = document.getElementById("input" + fields[i]);
        if (inputField.value === "") {
            inputField.classList.add("is-invalid");
            valid = false;
            document.getElementById("valid-feedback-input" + fields[i]).innerHTML = "<font color='red'>Please enter your " + names[i] + ".</>"
        }
        else {
            inputField.classList.add("is-valid");
        }
    }

    var emailField = document.getElementById("inputEmailAddress");
    var result = validateEmail(emailField.value);
    if(emailField.value !== "" && !result) {
        document.getElementById("valid-feedback-inputEmailAddress").innerHTML = "<font color='red'>Please enter a valid email address.</font>";
        emailField.classList.add("is-invalid");
        valid = false;
    }

    // checks contact information
    var fields = ["StudentFirstName", "StudentLastName", "Age", "Graduation"];
    var names = ["first name", "last name", "age as of July 1, " + new Date().getFullYear(), "anticipated high school graduation date"];
    for (var i = 0; i < fields.length; i ++) {
        var inputField = document.getElementById("input" + fields[i]);
        if (inputField.value === "") {
            inputField.classList.add("is-invalid");
            valid = false;
            document.getElementById("valid-feedback-input" + fields[i]).innerHTML = "<font color='red'>Please enter your student's " + names[i] + ".</>"
        }
        else {
            inputField.classList.add("is-valid");
        }
    }

    var inputField = document.getElementById("inputGender");
    if (inputField.value !== "") {
        inputField.classList.add("is-valid");
    }

    var inputAge = document.getElementById("inputAge");
    if (inputAge.value !== "" && inputAge.value < 13) {
        valid = false;
        document.getElementById("valid-feedback-inputAge").innerHTML = "<font color='red'>Your student must be at least 13 to be housed in the teen residence hall.</>";
        inputAge.classList.remove("is-valid");
        inputAge.classList.add("is-invalid");
    }

    return valid;
}

/** clears red validation feedback **/
function clearValidateFeedback() {
    var fields = ["FirstName", "LastName", "Address", "City", "State", "Zip", "PhoneNumber", "EmailAddress", "StudentFirstName", "StudentLastName", "Age", "Gender", "Graduation"];
    for (var i = 0; i < fields.length; i ++) {
        var inputField = document.getElementById("input" + fields[i]);
        inputField.classList.remove("is-invalid");
        inputField.classList.remove("is-valid");
        document.getElementById("valid-feedback-input" + fields[i]).innerHTML = "";
    }
    document.getElementById("errorMessage").innerHTML = "";
}