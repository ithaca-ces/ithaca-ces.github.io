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
});

/** changes what fields display if they select ECC and Violin Unit 1 **/
function changeLogicECC() {
    changeUpperLogic();
}

function changeLogicTwoWeek() {
    changeUpperLogic();
}

function changeUpperLogic() {
    var eccValue = getRadioButtonValue("everyChildCan");
    var twoWeekCourse = getSelectData("twoWeekCourses");
    if (eccValue === "yes" || twoWeekCourse.trim() !== "") {
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
        document.getElementById("twoWeekCourses").value = " ";

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
    var uniqueID = makeID().substring(0, 16);
    $('html,body').scrollTop(0);
    window.parent.postMessage("scrollTop", '*');
    if (validate()) {
        $(".progress-bar").animate({
            width: "100%"
        }, 10000);
        submitGoogleForm(uniqueID);
        webHook(uniqueID);
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
    var twoWeekCourse = getSelectData("twoWeekCourses")
    var week1Course = getSelectData("week1Courses");
    var week2Course = getSelectData("week2Courses");
    var tShirtSize = getSelectData("inputTShirt").replace('_', ' ');


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
        'entry.728439401': tShirtSize,
        'entry.26805010': uniqueID
    }
    if (eccValue === "yes") {
        formData["entry.616708405"] = eccName;
    }
    if (twoWeekCourse !== " ") {
        var index = twoWeekCoursesIDs.indexOf(twoWeekCourse);
        var name = twoWeekCoursesNames[index];
        formData["entry.1477180920"] = name;
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
    var twoWeekCourse = getSelectData("twoWeekCourses");
    var week1Course = getSelectData("week1Courses");
    var week2Course = getSelectData("week2Courses");

    var fullPrice = 0;

    if (eccValue === "yes") {
        fullPrice += parseFloat(eccPrice);
    }
    if (twoWeekCourse !== " ") {
        var index = twoWeekCoursesIDs.indexOf(twoWeekCourse);
        var price = twoWeekCoursesPrices[index];
        fullPrice += parseFloat(price);
    }
    if (week1Course !== " ") {
        var index = week1CoursesIDs.indexOf(week1Course);
        var price = week1CoursesPrices[index];
        fullPrice += parseFloat(price);
    }
    if (week2Course !== " ") {
        var index = week2CoursesIDs.indexOf(week2Course);
        var price = week2CoursesPrices[index];
        fullPrice += parseFloat(price);
    }

    var desc = "Suzuki Teacher Registration (ID " + uniqueID + ")";
    var line0 = "<div id=\"payform_" + "suzuki_teacher" + "\">";
    var line1 = "<input type=\"hidden\" name=\"PartNo\" value=\"" + desc + "\">";
    var line2 = "<input type=\"hidden\" name=\"Item\" value=\"" + desc + "\">";
    var line3 = "<input id=\"qty_payform_" + "suzuki_teacher" + "\" type=\"hidden\" name=\"Qty\" value=" + 1 + ">";
    var line4 = "<input type=\"hidden\" name=\"Price\" value=" + fullPrice + ">";
    var line5 = "</div>";
    var formInputs = line0 + line1 + line2 + line3 + line4 + line5;

    document.getElementById("payFormInputs").innerHTML = formInputs;
    document.getElementById("payform").submit();
}

/** validates form fields **/
function validate() {
    clearValidateFeedback();
    var valid = true;

    // checks contact information
    var fields = ["FirstName", "LastName", "Address", "City", "State", "Zip", "PhoneNumber", "EmailAddress", "TShirt"];
    var names = ["first name", "last name", "street address", "city", "state/province", "zip code", "phone number", "email address", "t-shirt size"];
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
    var twoWeekCourse = getSelectData("twoWeekCourses");
    var week1Course = getSelectData("week1Courses");
    var week2Course = getSelectData("week2Courses");
    if (eccValue == null && twoWeekCourse === " " && week1Course === " " && week2Course === " ") {
        hasCourses = false;
    }
    else {
        hasCourses = true;
    }
    if (eccValue === "yes" || twoWeekCourse !== " ") {
        if (week1Course !== " " || week2Course !== " ") {
            validCourses = false;
        }
    }
    else {
        validCourses = true;
    }
    if (week1Course !== " " || week2Course !== " ") {
        if (eccValue != null || twoWeekCourse !== " ") {
            validCourses = false;
        }
    }
    else {
        validCourses = true;
    }
    if (((eccValue === "no" && twoWeekCourse === " ") || (eccValue == null && twoWeekCourse === " ") || (eccValue === "no" && twoWeekCourse === " ")) && (week1Course !== " " || week2Course !== "")) {
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
    var fields = ["FirstName", "LastName", "Address", "City", "State", "Zip", "PhoneNumber", "EmailAddress", "TShirt"];
    for (var i = 0; i < fields.length; i ++) {
        var inputField = document.getElementById("input" + fields[i]);
        inputField.classList.remove("is-invalid");
        inputField.classList.remove("is-valid");
        document.getElementById("valid-feedback-input" + fields[i]).innerHTML = "";
    }
    document.getElementById("errorMessage").innerHTML = "";
    document.getElementById("noItemsErrorMessage").innerHTML = "";
}

/** webhook **/
function webHook(id) {
    var eccValue = getRadioButtonValue("everyChildCan");
    var twoWeekCourse = getSelectData("twoWeekCourses");
    var week1Course = getSelectData("week1Courses");
    var week2Course = getSelectData("week2Courses");
    var nameArray = [];
    if (eccValue === "yes") {
        nameArray.push(eccName);
    }
    if (twoWeekCourse !== " ") {
        var index = twoWeekCoursesIDs.indexOf(twoWeekCourse);
        var name = twoWeekCoursesNames[index];
        nameArray.push(name);
    }
    if (week1Course !== " ") {
        var index = week1CoursesIDs.indexOf(week1Course);
        var name = week1CoursesNames[index];
        nameArray.push(name);
    }
    if (week2Course !== " ") {
        var index = week2CoursesIDs.indexOf(week2Course);
        var name = week2CoursesNames[index];
        nameArray.push(name);
    }
    var text = nameArray[0];
    if (nameArray.length > 1) {
        text += " and " + nameArray[1];
    }

    var url = "https://outlook.office.com/webhook/26a7efc0-83ae-498b-9804-aadcf71f0f6c@fa1ac8f6-5e54-4857-9f0b-4aa422c09689/IncomingWebhook/1fcbfd4673c04aaeb026b119a3d68f73/e4ae9ca5-eeac-4c99-ad5c-3fc1c29bece1";
    var firstName = $('input[id=inputFirstName]').val();
    var lastName = $('input[id=inputLastName]').val();
    var text = "<b>TEACHER REGISTRATION FORM SUBMISSION</b><br>" + firstName + " " + lastName + " has submitted a Teacher Registration Form for " + text + ".<br><i>(ID # " + id + ")</i>";
    $.ajax({
        data: JSON.stringify({
            "text": text
        }),
        dataType: 'json',
        type: 'POST',
        url: url
    });
}