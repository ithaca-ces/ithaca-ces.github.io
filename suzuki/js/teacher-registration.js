/** makes unique of form submission **/
function makeID() {
    return Math.random().toString(32).substr(2) + "0" + Math.random().toString(32).substr(2);
}

$(document).ready(function () {
    $("#radio1").click(function(){
        changeLogicECC();
    });
    $("#radio2").click(function(){
        changeLogicECC();
    });
    $("#radio3").click(function(){
        changeLogicECC();
    });
    $("#radio4").click(function(){
        changeLogicECC();
    });
});

/** changes what fields display if they select ECC and Violin Unit 1 **/
function changeLogicECC() {
    var eccValue = getRadioButtonValue("everyChildCan");
    var violinUnit1Value = getRadioButtonValue("violinUnit1");
    if (eccValue === "yes" || violinUnit1Value === "yes") {
        document.getElementById("courseSelects").style.display = "none";
        document.getElementById("courseSelects").style.visibility = "hidden";
        document.getElementById("week1Courses").value = " ";
        document.getElementById("week2Courses").value = " ";
    }
    else {
        document.getElementById("courseSelects").style.display = "inherit";
        document.getElementById("courseSelects").style.visibility = "visible";
    }
}

/** change what fields display if they select week 1 and week 2 courses **/
function changeLogicCourses() {
    var week1Course = getSelectData("week1Courses");
    var week2Course = getSelectData("week2Courses");
    if (week1Course !== " " || week2Course !== " ") {
        document.getElementById("courseRadios").style.display = "none";
        document.getElementById("courseRadios").style.visibility = "hidden";
        document.getElementById("radio1").checked = false;
        document.getElementById("radio2").checked = false;
        document.getElementById("radio3").checked = false;
        document.getElementById("radio4").checked = false;
    }
    else {
        document.getElementById("courseRadios").style.display = "inherit";
        document.getElementById("courseRadios").style.visibility = "visible";
    }
}

/** main submit function **/
function submit() {
    document.getElementById("container").style.display = "none";
    document.getElementById("container").style.visibility = "hidden";
    document.getElementById("post").style.display = "inherit";
    document.getElementById("post").style.visibility = "visible";
    var uniqueID = makeID();
    $('html,body').scrollTop(0);
    window.parent.postMessage("scrollTop", '*');
    if (validate()) {
        $(".progress-bar").animate({
            width: "100%"
        }, 10000);
        submitGoogleForm(uniqueID);
        setTimeout(function(){
            submitPaymentForm(uniqueID);
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

/** submit google form **/
function submitGoogleForm(uniqueID) {
    var eccValue = getRadioButtonValue("everyChildCan");
    var violinUnit1Value = getRadioButtonValue("violinUnit1");
    var week1Course = getSelectData("week1Courses");
    var week2Course = getSelectData("week2Courses");


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
        'entry.26805010': uniqueID
    }
    if (eccValue === "yes") {
        formData["entry.616708405"] = eccName;
    }
    if (violinUnit1Value === "yes") {
        formData["entry.1477180920"] = violinUnit1Name;
    }
    if (week1Course !== " ") {
        var index = week1CoursesIDs.indexOf(week1Course);
        var name = week1CoursesNames[index];
        formData["entry.645715329"] = name;
    }
    if (week2Course !== " ") {
        var index = week2CoursesIDs.indexOf(week2Course);
        var name = week2CoursesNames[index];
        formData["entry.1404295443"] = name;
    }

    // process the form
    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'https://docs.google.com/forms/d/e/1FAIpQLScNZYR6vPubFntj1Mj9C2T77teW-HSduAjD1vvFtbQfPO-A1g/formResponse', // the url where we want to POST
        data        : formData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode          : true
    })
    // using the done promise callback
        .done(function(data) {

        });
}

/** submit payment form **/
function submitPaymentForm(uniqueID) {
    var eccValue = getRadioButtonValue("everyChildCan");
    var violinUnit1Value = getRadioButtonValue("violinUnit1");
    var week1Course = getSelectData("week1Courses");
    var week2Course = getSelectData("week2Courses");

    var formInputs = "";

    if (eccValue === "yes") {
        formInputs += makePayFormInputString("ecc", eccName, eccPrice, uniqueID);
    }
    if (violinUnit1Value === "yes") {
        formInputs += makePayFormInputString("ecc", violinUnit1Name, violinUnit1Price, uniqueID);
    }

    if (week1Course !== " ") {
        var index = week1CoursesIDs.indexOf(week1Course);
        var name = week1CoursesNames[index] + " (" + week1 + ")";
        var price = week1CoursesPrices[index];
        formInputs += makePayFormInputString(week1Course, name, price, uniqueID);
    }
    if (week2Course !== " ") {
        var index = week2CoursesIDs.indexOf(week2Course);
        var name = week2CoursesNames[index] + " (" + week2 + ")";
        var price = week2CoursesPrices[index];
        formInputs += makePayFormInputString(week2Course, name, price, uniqueID);
    }

    document.getElementById("payFormInputs").innerHTML = formInputs;
    document.getElementById("payform").submit();
}

/** validates form fields **/
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

    var hasCourses = false;
    var validCourses = false;

    var eccValue = getRadioButtonValue("everyChildCan");
    var violinUnit1Value = getRadioButtonValue("violinUnit1");
    var week1Course = getSelectData("week1Courses");
    var week2Course = getSelectData("week2Courses");
    if (eccValue == null && violinUnit1Value == null && week1Course === " " && week2Course === " ") {
        hasCourses = false;
    }
    else {
        hasCourses = true;
    }
    if (eccValue === "yes" || violinUnit1Value === "yes") {
        if (week1Course !== " " || week2Course !== " ") {
            validCourses = false;
        }
    }
    else {
        validCourses = true;
    }
    if (week1Course !== " " || week2Course !== " ") {
        if (eccValue != null || violinUnit1Value != null) {
            validCourses = false;
        }
    }
    else {
        validCourses = true;
    }
    if (((eccValue === "no" && violinUnit1Value == null) || (eccValue == null && violinUnit1Value === "no") || (eccValue === "no" && violinUnit1Value === "no")) && (week1Course !== " " || week2Course !== "")) {
        hasCourses = false;
    }


    if (!hasCourses) {
        document.getElementById("noItemsErrorMessage").innerHTML = "<h4 style='color:red'>Please register for a course!</h4><hr>";
        valid = false;
    }
    else if (!validCourses) {
        document.getElementById("noItemsErrorMessage").innerHTML = "<h4 style='color:red'>Please fix your course registration choices!</h4><hr>";
        valid = false;
    }

    return valid;
}

/** clear red and text from validate function **/
function clearValidateFeedback() {
    var fields = ["FirstName", "LastName", "Address", "City", "State", "Zip", "PhoneNumber", "EmailAddress"];
    for (var i = 0; i < fields.length; i ++) {
        var inputField = document.getElementById("input" + fields[i]);
        inputField.classList.remove("is-invalid");
        inputField.classList.remove("is-valid");
        document.getElementById("valid-feedback-input" + fields[i]).innerHTML = "";
    }
    document.getElementById("errorMessage").innerHTML = "";
    document.getElementById("noItemsErrorMessage").innerHTML = "";
}


/** make payment form HTML **/
function makePayFormInputString(value, name, price, inputID) {
    var desc = "Suzuki " + name;
    if (desc.indexOf("(") > -1) {
        desc = desc.split("(")[0].trim();
    }
    var idLength = 50 - 6 - desc.length;
    var substringID = inputID.substring(0, idLength);
    desc = desc + " (ID " + substringID + ")";
    var line0 = "<div id=\"payform_" + value + "\">";
    var line1 = "<input type=\"hidden\" name=\"PartNo\" value=\"" + desc + "\">";
    var line2 = "<input type=\"hidden\" name=\"Item\" value=\"" + desc + "\">";
    var line3 = "<input id=\"qty_payform_" + value + "\" type=\"hidden\" name=\"Qty\" value=" + 1 + ">";
    var line4 = "<input type=\"hidden\" name=\"Price\" value=" + price + ">";
    var line5 = "</div>";
    return line0 + line1 + line2 + line3 + line4 + line5;
}