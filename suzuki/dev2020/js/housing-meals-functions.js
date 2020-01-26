/** makes inputs for meal plans **/
function makeMealPlanInputs() {
    var string = "";
    for (var i = 1; i < MEAL_PLAN_MAX; i ++) {
        string += '<div class="form-row" id="mealPlanName-' + i + '" style="display: none;visibility: hidden">';
        string += '<div class="form-group col-md-6">';
        string += '<label for="inputFirstNameMealPlan-' + i + '"><strong>Meal Plan #' + i + '</strong> - First Name <span style="color: red">*</span></label>';
        string += ' <input type="text" class="form-control" id="inputFirstNameMealPlan-' + i + '">';
        string += '<div id="valid-feedback-inputFirstNameMealPlan-' + i + '"></div>';
        string += '</div>';
        string += '<div class="form-group col-md-6">';
        string += '<label for="inputLastNameMealPlan-' + i + '"><strong>Meal Plan #' + i + '</strong> - Last Name <span style="color: red">*</span></label>';
        string += '<input type="text" class="form-control" id="inputLastNameMealPlan-' + i + '">';
        string += '<div id="valid-feedback-inputLastNameMealPlan-' + i + '"></div>';
        string += '</div></div>';
    }
    document.getElementById("mealPlanInputs").innerHTML = string;
}

/** generates unique ID for housing & meals **/
function makeID() {
    var d = new Date();
    var n = d.getTime().toString();
    var lastSix = n.substr(n.length - 6);
    var randomID = Math.random().toString(32).substr(2) + Math.random().toString(32).substr(2);
    var id = lastSix + randomID;
    return id.substring(0, 15);
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
        var registrationID = makeID();
        submitGoogleForm(registrationID);
        webHook(registrationID);
        setTimeout(function(){
            submitPaymentForm(registrationID);
        }, 10000);
    }
    else {
        document.getElementById("errorMessage").innerHTML = "<h3 style='color:red'>Please correct the issue(s) indicated below in order to complete your form submission!</h3><hr>";
        document.getElementById("container").style.display = "inherit";
        document.getElementById("container").style.visibility = "visible";
        document.getElementById("post").style.display = "none";
        document.getElementById("post").style.visibility = "hidden";
    }
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


    var hasMeals = false;
    var hasHousing = false;
    var badHousing = false;
    var badCount = 0;

    var mealCount = $('input[id=inputMealPlanCount]').val();
    if (mealCount > 0) {
        hasMeals = true;
    }

    for (var j = 1; j <= parseInt(mealCount); j ++) {
        var firstName = document.getElementById("inputFirstNameMealPlan-" + j);
        var lastName = document.getElementById("inputLastNameMealPlan-" + j);
        if (firstName.value === "") {
            valid = false;
            firstName.classList.add("is-invalid");
            document.getElementById("valid-feedback-inputFirstNameMealPlan-" + j).innerHTML = "<font color='red'>Please enter a first name.</>";
        }
        else {
            firstName.classList.add("is-valid");
        }
        if (lastName.value === "") {
            valid = false;
            lastName.classList.add("is-invalid");
            document.getElementById("valid-feedback-inputLastNameMealPlan-" + j).innerHTML = "<font color='red'>Please enter a last name.</>";
        }
        else {
            lastName.classList.add("is-valid");
        }
    }

    var housingString = document.getElementById("housingList").innerText;
    var housingList = housingString.split(";;;");
    var quantityString = document.getElementById("quantityList").innerHTML;
    var quantityList = quantityString.split(";;;");
    for (var i = 0; i < housingList.length - 1; i ++) {
        var inputField = document.getElementById("input" + housingList[i]);
        if (inputField != null) {
            var count = parseInt(inputField.value);
            if (count > 0) {
                hasHousing = true;
                if (count > parseInt(quantityList[i])) {
                    badHousing = true;
                    badCount ++;
                    inputField.classList.add("is-invalid");
                    valid = false;
                    document.getElementById("valid-feedback-input" + housingList[i]).innerHTML = "<font color='red'>Please enter a number below " + (parseInt(quantityList[i]) + 1) + ".</>";
                }
                else {
                    inputField.classList.add("is-valid");
                }
            }

        }
    }


    if (!hasMeals && !hasHousing) {
        document.getElementById("noItemsErrorMessage").innerHTML = "<h4 style='color:red'>Please select housing and/or a meal plan to purchase!</h4><hr>";
        valid = false;
    }
    if (badHousing && badCount === 1) {
        document.getElementById("noItemsErrorMessage").innerHTML = "<h4 style='color:red'>Please fix the issue indicated below with your housing choice!</h4><hr>";
        valid = false;
    }
    if (badHousing && badCount > 1) {
        document.getElementById("noItemsErrorMessage").innerHTML = "<h4 style='color:red'>Please fix the issues indicated below with your housing choice!</h4><hr>";
        valid = false;
    }

    return valid;
}

/** clears red validation feedback **/
function clearValidateFeedback() {
    var fields = ["FirstName", "LastName", "Address", "City", "State", "Zip", "PhoneNumber", "EmailAddress"];
    for (var i = 0; i < fields.length; i ++) {
        var inputField = document.getElementById("input" + fields[i]);
        inputField.classList.remove("is-invalid");
        inputField.classList.remove("is-valid");
        document.getElementById("valid-feedback-input" + fields[i]).innerHTML = "";
    }
    var housingString = document.getElementById("housingList").innerText;
    var housingList = housingString.split(";;;");
    for (var i = 0; i < housingList.length - 1; i ++) {
        var inputField = document.getElementById("input" + housingList[i]);
        if (inputField != null) {
            inputField.classList.remove("is-invalid");
            inputField.classList.remove("is-valid");
            document.getElementById("valid-feedback-input" + housingList[i]).innerHTML = "";
        }
    }
    for (var i = 1; i <= MEAL_PLAN_MAX; i ++) {
        var inputFieldFirst = document.getElementById("inputFirstNameMealPlan-" + i);
        var inputFieldLast = document.getElementById("inputLastNameMealPlan-" + i);
        if (inputFieldFirst != null) {
            inputFieldFirst.classList.remove("is-invalid");
            inputFieldFirst.classList.remove("is-valid");
            document.getElementById("valid-feedback-inputFirstNameMealPlan-" + i).innerHTML = "";
        }
        if (inputFieldLast != null) {
            inputFieldLast.classList.remove("is-invalid");
            inputFieldLast.classList.remove("is-valid");
            document.getElementById("valid-feedback-inputLastNameMealPlan-" + i).innerHTML = "";
        }
    }
    document.getElementById("errorMessage").innerHTML = "";
    document.getElementById("noItemsErrorMessage").innerHTML = "";
}

/** makes meal plan name fields **/
function changeMealPlanFields() {
    var mealPlanCount = document.getElementById("inputMealPlanCount").value;
    if (mealPlanCount >= 1) {
        document.getElementById("mealPlanInputsTitle").style.visibility = "visible";
        document.getElementById("mealPlanInputsTitle").style.display = "";
    }
    else {
        document.getElementById("mealPlanInputsTitle").style.visibility = "hidden";
        document.getElementById("mealPlanInputsTitle").style.display = "none";
    }
    for (var i = 1; i < MEAL_PLAN_MAX; i++) {
        if (i <= mealPlanCount) {
            document.getElementById("mealPlanName-" + i).style.visibility = "visible";
            document.getElementById("mealPlanName-" + i).style.display = "";
        }
        else {
            document.getElementById("mealPlanName-" + i).style.visibility = "hidden";
            document.getElementById("mealPlanName-" + i).style.display = "none";
        }
    }
}