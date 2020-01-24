/** makes unique of form submission **/
function makeID() {
    var value = document.getElementById("inputID").value;
    if (value === "") {
        document.getElementById("inputID").value = Math.random().toString(32).substr(2) + "_" + Math.random().toString(32).substr(2);
    }
}

/** makes listing of siblings to display on last page of form **/
function makeNamesToDisplay() {
    var nameList = [];
    for (var i = 1; i <= globalStudentCount; i++) {
        var firstName = $('input[id=inputStudentFirstName-' + i + ']').val();
        var lastName = $('input[id=inputStudentLastName-' + i + ']').val();
        nameList.push(firstName + " " + lastName);
    }
    document.getElementById("studentsRegisteredList").innerHTML = "";
    for (var i = 0; i < nameList.length; i ++) {
        var node = document.createElement("li");                 // Create a <li> node
        var textnode = document.createTextNode(nameList[i]);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("studentsRegisteredList").appendChild(node);    // Append <li> to <ul>
    }
}

/** validates first page about parent **/
function validateContactInfo() {
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

    var studentCount = getSelectData("inputStudentCount");
    if (studentCount !== null && studentCount !== "") {
        globalStudentCount = studentCount;
        document.getElementById("inputStudentCount").classList.add("is-valid");
    }
    else {
        globalStudentCount = 1;
    }

    if (!valid) {
        document.getElementById("errorMessage").innerHTML = "<h3 style='color:red'>Please correct the issue(s) indicated below in order to complete your form submission!</h3><hr>";
    }

    return valid;
}

/** validates student information (per page) **/
function validateStudentInfo(number) {
    clearValidateFeedback();
    var valid = true;
    // checks contact information
    var fields = ["StudentFirstName", "StudentLastName", "Age", "Graduation", "Accompanied"];
    var names = ["first name", "last name", "age as of July 1, " + new Date().getFullYear(), "anticipated high school graduation date"];
    for (var i = 0; i < fields.length; i ++) {
        var inputField = document.getElementById("input" + fields[i] + "-" + number);
        if (inputField.value === "") {
            inputField.classList.add("is-invalid");
            valid = false;
            document.getElementById("valid-feedback-input" + fields[i] + "-" + number).innerHTML = "<font color='red'>Please enter your student's " + names[i] + ".</>"
        }
        else {
            inputField.classList.add("is-valid");
        }
    }

    if (getSelectData("inputAccompanied-" + number) === "designatedAdult") {
        var fields = ["DesignatedAdultFirstName", "DesignatedAdultLastName", "DesignatedAdultAddress", "DesignatedAdultCity", "DesignatedAdultState", "DesignatedAdultZip", "DesignatedAdultPhoneNumber"];
        var names = ["first name", "last name", "address", "city", "state/province", "zip code", "phone number"];
        for (var i = 0; i < fields.length; i ++) {
            inputField = document.getElementById("input" + fields[i] + "-" + number);
            if (inputField.value === "") {
                inputField.classList.add("is-invalid");
                valid = false;
                document.getElementById("valid-feedback-input" + fields[i] + "-" + number).innerHTML = "<font color='red'>Please enter the designated adult's " + names[i] + ".</>"
            }
            else {
                inputField.classList.add("is-valid");
            }
        }
    }

    var selectFields = ["Course", "Instrument", "BookLevel", "Title", "TShirt"];
    var selectNames = ["course", "instrument", "book level", "piece's code and title", "t-shirt size"];
    for (var i = 0; i < selectFields.length; i++) {
        var selectField = document.getElementById("input" + selectFields[i] + "-" + number);
        // if it has options
        var selectData = getSelectData("input" + selectFields[i] + "-" + number);
        if (selectData !== null && selectData !== "") {
            selectField.classList.add("is-valid");
        } else {
            selectField.classList.add("is-invalid");
            valid = false;
            document.getElementById("valid-feedback-input" + selectFields[i] + "-" + number).innerHTML = "<font color='red'>Please select a " + selectNames[i] + ".</>"
        }

    }

    // validate movement field if there is a movement field
    var movementField = document.getElementById("inputMovement-" + number);
    if (getCount(movementField, false) > 1) {
        var movementData = getSelectData("inputMovement-" + number);
        if (movementData !== null && movementData  !== "") {
            movementField.classList.add("is-valid");
        }
        else {
            movementField.classList.add("is-invalid");
            valid = false;
            document.getElementById("valid-feedback-inputMovement-" + number).innerHTML = "<font color='red'>Please select a movement.</>"
        }
    }

    // validate custom piece field if they're advanced
    try {
        var courseChoice = getSelectData("inputCourse-" + number);
        if (courseChoice.includes("advancedinstitute")) {
            var pieceField = getSelectData("inputTitle-" + number);
            if (pieceField === "other") {
                var inputField = document.getElementById("input" + "CustomPiece" + "-" + number);
                if (inputField.value === "") {
                    inputField.classList.add("is-invalid");
                    valid = false;
                    document.getElementById("valid-feedback-input" + "CustomPiece" + "-" + number).innerHTML = "<font color='red'>Please enter the " + "name of the other piece" + ".</>"
                }
                else {
                    inputField.classList.add("is-valid");
                }
            }
        }
    }
    catch(err) {

    }

    var fields = ["TeacherFirstName", "TeacherLastName", "TeacherPhoneNumber"];
    var names = ["teacher's first name", "teacher's last name", "teacher's phone number"];
    for (var i = 0; i < fields.length; i ++) {
        var inputField = document.getElementById("input" + fields[i] + "-" + number);
        if (inputField.value === "") {
            inputField.classList.add("is-invalid");
            valid = false;
            document.getElementById("valid-feedback-input" + fields[i] + "-" + number).innerHTML = "<font color='red'>Please enter the " + names[i] + ".</>"
        }
        else {
            inputField.classList.add("is-valid");
        }
    }

    // optional fields
    var fields = ["Gender"];
    for (var i = 0; i < fields.length; i ++) {
        var inputField = document.getElementById("input" + fields[i] + "-" + number);
        if (inputField.value !== "") {
            inputField.classList.add("is-valid");
        }
    }

    if (!valid) {
        document.getElementById("errorMessage").innerHTML = "<h3 style='color:red'>Please correct the issue(s) indicated below in order to complete your form submission!</h3><hr>";
    }

    return valid;
}

/** clears validate feedback **/
function clearValidateFeedback() {
    var fields = ["FirstName", "LastName", "Address", "City", "State", "Zip", "PhoneNumber", "EmailAddress"];
    for (var i = 0; i < fields.length; i ++) {
        var inputField = document.getElementById("input" + fields[i]);
        inputField.classList.remove("is-invalid");
        inputField.classList.remove("is-valid");
        document.getElementById("valid-feedback-input" + fields[i]).innerHTML = "";
    }
    for (var j = 1; j < MAX_STUDENT_NUMBER; j ++) {
        var studentFields = ["StudentFirstName", "StudentLastName", "Gender", "Age", "Graduation", "Accompanied", "DesignatedAdultFirstName", "DesignatedAdultLastName", "DesignatedAdultAddress", "DesignatedAdultCity", "DesignatedAdultState", "DesignatedAdultZip", "DesignatedAdultPhoneNumber", "Course", "Instrument", "BookLevel", "Title", "Movement", "CustomPiece", "TeacherFirstName", "TeacherLastName", "TeacherPhoneNumber", "TShirt"];
        for (var i = 0; i < studentFields.length; i++) {
            var studentField = document.getElementById("input" + studentFields[i] + "-" + j);
            studentField.classList.remove("is-invalid");
            studentField.classList.remove("is-valid");
            if (document.getElementById("valid-feedback-input" + studentFields[i] + "-" + j) != null) {
                document.getElementById("valid-feedback-input" + studentFields[i] + "-" + j).innerHTML = "";
            }
        }
        /*for (var i = 0; i < enrichmentIds.length; i ++) {
            document.getElementById("input" + enrichmentIds[i] + "-" + j).classList.remove("is-invalid");
            document.getElementById("input" + enrichmentIds[i] + "-" + j).classList.remove("is-valid");
        }
        document.getElementById("enrichmentError-" + j).innerHTML = "";*/
    }
    clearValidateFeedbackForSiblings();
    document.getElementById("errorMessage").innerHTML = "";
}

/** main validate function **/
function validate() {
    var contactValidate = validateContactInfo();
    if (!contactValidate) {
        document.getElementById("student" + globalStudentCount + "Information").style.display = "none";
        document.getElementById("student" + globalStudentCount + "Information").style.visibility = "hidden";
        document.getElementById("parentInformation").style.display = "inherit";
        document.getElementById("parentInformation").style.visibility = "visible";
        goToTop();
        return false;
    }
    for (var i = 1; i <= globalStudentCount; i ++) {
        var studentValidate = validateStudentInfo(i);
        if (!studentValidate) {
            document.getElementById("student" + globalStudentCount + "Information").style.display = "none";
            document.getElementById("student" + globalStudentCount + "Information").style.visibility = "hidden";
            document.getElementById("studentNumber").innerHTML = "&mdash; Student " + i;
            document.getElementById("student" + i + "Information").style.display = "inherit";
            document.getElementById("student" + i + "Information").style.visibility = "visible";
            showInputAccompanied(i);
            pageNumber = i + 1;
            goToTop();
            return false;
        }
    }
    var siblingsValidate = validateSiblings();
    if (!siblingsValidate) {
        document.getElementById("errorMessage").innerHTML = "<h3 style='color:red'>Please correct the issue(s) indicated below in order to complete your form submission!</h3><hr>";
        document.getElementById("container").style.display = "inherit";
        document.getElementById("container").style.visibility = "visible";
        document.getElementById("post").style.display = "none";
        document.getElementById("post").style.visibility = "hidden";
        goToTop();
        return false;
    }
    return true;
}

/** main submit function **/
function submit() {
    document.getElementById("container").style.display = "none";
    document.getElementById("container").style.visibility = "hidden";
    document.getElementById("post").style.display = "inherit";
    document.getElementById("post").style.visibility = "visible";
    goToTop();
    if (validate()) {
        $(".progress-bar").animate({
            width: "100%"
        }, 5000 + (parseInt(globalStudentCount) * 5000));
        submitGoogleForm();
        setTimeout(function(){
            submitPaymentForm();
        }, 5000 + (parseInt(globalStudentCount) * 5000));
    }
    else {
        document.getElementById("errorMessage").innerHTML = "<h3 style='color:red'>Please correct the issue(s) indicated below in order to complete your form submission!</h3><hr>";
        document.getElementById("container").style.display = "inherit";
        document.getElementById("container").style.visibility = "visible";
        document.getElementById("post").style.display = "none";
        document.getElementById("post").style.visibility = "hidden";
    }
}

/** submits Google form **/
function submitGoogleForm() {
    var firstName = $('input[id=inputFirstName]').val();
    var lastName = $('input[id=inputLastName]').val();
    var address =  $('input[id=inputAddress]').val();
    var city = $('input[id=inputCity]').val();
    var state = $('input[id=inputState]').val();
    var zip = $('input[id=inputZip]').val();
    var phoneNumber = $('input[id=inputPhoneNumber]').val();
    var emailAddress = $('input[id=inputEmailAddress]').val();
    var uniqueID = $('input[id=inputID]').val();
    var notRegisteredSiblings = makeSiblingsString();
    for (var j = 1; j <= globalStudentCount; j++) {
        var incFirstName = $('input[id=inputStudentFirstName-' + j + ']').val();
        var incLastName = $('input[id=inputStudentLastName-' + j + ']').val();
        var accompaniedValue = getSelectData("inputAccompanied-" + j);
        var accompaniedIndex = accompanyValues.indexOf(accompaniedValue);
        var accompaniedName = accompanyNames[accompaniedIndex];
        var courseValue = getSelectData("inputCourse-" + j);
        var courseIndex = courseValues.indexOf(courseValue);
        var courseName = courseNames[courseIndex];
        var instrumentValue = getSelectData("inputInstrument-" + j);
        var instrumentIndex = instrumentValues.indexOf(instrumentValue);
        var instrumentName = instrumentNames[instrumentIndex];
        var bookLevel = getSelectData("inputBookLevel-" + j);
        if (bookLevel !== "N/A") {
            bookLevel = "Book " + bookLevel;
        }
        var code = getSelectData("inputTitle-" + j);
        var title = getSelectDataTitle("inputTitle-" + j).split(": ")[1];
        var movement = getSelectData("inputMovement-" + j);
        var customPiece = $('input[id=inputCustomPiece-' + j + ']').val();
        var teacherFirstName = $('input[id=inputTeacherFirstName-' + j + ']').val();
        var teacherLastName = $('input[id=inputTeacherLastName-' + j + ']').val();
        var teacherPhoneNumber = $('input[id=inputTeacherPhoneNumber-' + j + ']').val();
        var enrichmentChoice1 = getSelectData("inputEnrichmentChoice1-" + j);
        var enrichmentChoice2 = getSelectData("inputEnrichmentChoice2-" + j);
        var enrichmentChoice3 = getSelectData("inputEnrichmentChoice3-" + j);
        var tShirtSize = getSelectData("inputTShirt-" + j).replace('_', ' ');
        var siblings = makeNamesString(j);
        if (notRegisteredSiblings !== "") {
            siblings += notRegisteredSiblings;
        }
        if (siblings.length > 1) {
            siblings = siblings.substring(0, siblings.length - 2);
        }
        var incUniqueID = makeUniqueID(incFirstName, incLastName, courseName, instrumentName, bookLevel, title, code, teacherFirstName + teacherLastName, teacherPhoneNumber);
        var registrationID = uniqueID.substring(0, 8) + j + incUniqueID.toString().substring(0, 8);
        var formData = {
            'entry.2039036389': firstName,
            'entry.305040084': lastName,
            'entry.1583950870': address,
            'entry.1741944776': city,
            'entry.1449597621': state,
            'entry.2043889500': zip,
            'entry.1770398499': phoneNumber,
            'entry.303292725': emailAddress,
            'entry.456678140': incFirstName,
            'entry.1052902752': incLastName,
            'entry.991750866': $('input[id=inputGender-' + j + ']').val(),
            'entry.778338538': $('input[id=inputAge-' + j + ']').val(),
            'entry.1849563826': $('input[id=inputGraduation-' + j + ']').val(),
            'entry.786830166': accompaniedName,
            'entry.1226946231': $('input[id=inputDesignatedAdultFirstName-' + j + ']').val(),
            'entry.88700460': $('input[id=inputDesignatedAdultLastName-' + j + ']').val(),
            'entry.25347046': $('input[id=inputDesignatedAdultAddress-' + j + ']').val(),
            'entry.1930667891': $('input[id=inputDesignatedAdultCity-' + j + ']').val(),
            'entry.937988041': $('input[id=inputDesignatedAdultState-' + j + ']').val(),
            'entry.1136805538': $('input[id=inputDesignatedAdultZip-' + j + ']').val(),
            'entry.1306504024': $('input[id=inputDesignatedAdultPhoneNumber-' + j + ']').val(),
            'entry.616708405': courseName,
            'entry.429624467': instrumentName,
            'entry.1295208958': bookLevel,
            'entry.1431622853': title,
            'entry.835452724': code,
            'entry.1758035001': customPiece,
            'entry.1702328635': movement,
            'entry.1581932096': teacherFirstName + " " + teacherLastName,
            'entry.846808053': teacherPhoneNumber,
            'entry.650938505': enrichmentChoice1,
            'entry.154989671': enrichmentChoice2,
            'entry.903246233': enrichmentChoice3,
            'entry.1178481040': tShirtSize,
            'entry.332529542': $('input[id=inputTeacherRequests-' + j + ']').val(),
            'entry.1208655369': siblings,
            'entry.663733401': $('input[id=inputID]').val(),
            'entry.2097352746': registrationID
        }

        $.ajax({
            type: 'POST',
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSfKtOLno8ErYcY1khxYHZRkXSxcSTYDBzhBbsYRV8uJos6DAg/formResponse', // the url where we want to POST
            data: formData,
            dataType: 'json',
            encode: true
        })
            .done(function (data) {

            });
        webHook(incFirstName, incLastName, courseName, instrumentName, bookLevel, registrationID);
    }
}

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function makeUniqueID(firstName, lastName, courseName, instrumentName, bookLevel, title, code, teacherName, teacherPhoneNumber) {
    var string = firstName + lastName + courseName + instrumentName + bookLevel + title + code + teacherName + teacherPhoneNumber;
    var hashCode = string.hashCode().toString();
    if (hashCode.charAt(0) === '-') {
        hashCode = hashCode.substring(1, hashCode.length);
    }
    return hashCode;
}

/** submits payment form **/
function submitPaymentForm() {
    var formInputs = "";
    var uniqueID = $('input[id=inputID]').val();
    for (var i = 1; i <= globalStudentCount; i ++) {
        var value = getSelectData("inputCourse-" + i);
        if (value !== "") {
            var index = courseValues.indexOf(value);
            var name = courseNames[index];
            var price = coursePrices[index];
            var incFirstName = $('input[id=inputStudentFirstName-' + i + ']').val();
            var incLastName = $('input[id=inputStudentLastName-' + i + ']').val();
            var courseValue = getSelectData("inputCourse-" + i);
            var courseIndex = courseValues.indexOf(courseValue);
            var courseName = courseNames[courseIndex];
            var instrumentValue = getSelectData("inputInstrument-" + i);
            var instrumentIndex = instrumentValues.indexOf(instrumentValue);
            var instrumentName = instrumentNames[instrumentIndex];
            var bookLevel = getSelectData("inputBookLevel-" + i);
            var code = getSelectData("inputTitle-" + i);
            var title = getSelectDataTitle("inputTitle-" + i).split(": ")[1];
            var teacherFirstName = $('input[id=inputTeacherFirstName-' + i + ']').val();
            var teacherLastName = $('input[id=inputTeacherLastName-' + i + ']').val();
            var teacherPhoneNumber = $('input[id=inputTeacherPhoneNumber' + i + ']').val();
            var incUniqueID = makeUniqueID(incFirstName, incLastName, courseName, instrumentName, bookLevel, title, code, teacherFirstName + teacherLastName, teacherPhoneNumber);
            var registrationID = uniqueID.substring(0, 8) + i + incUniqueID.toString().substring(0, 8);
            var desc = "Suzuki Student Registration (ID " + registrationID + ")";
            var line0 = "<div id=\"payform_" + value + "\">";
            var line1 = "<input type=\"hidden\" name=\"PartNo\" value=\"" + desc + "\">";
            var line2 = "<input type=\"hidden\" name=\"Item\" value=\"" + desc + "\">";
            var line3 = "<input id=\"qty_payform_" + value + "\" type=\"hidden\" name=\"Qty\" value=" + 1 + ">";
            var line4 = "<input type=\"hidden\" name=\"Price\" value=" + price + ">";
            var line5 = "</div>";
            formInputs += line0 + line1 + line2 + line3 + line4 + line5;
        }

    }
    document.getElementById("payFormInputs").innerHTML = formInputs;
    document.getElementById("payform").submit();
}

/** web hook **/
function webHook(studentFirst, studentLast, course, instrument, bookLevel, id) {
    var url = "https://outlook.office.com/webhook/26a7efc0-83ae-498b-9804-aadcf71f0f6c@fa1ac8f6-5e54-4857-9f0b-4aa422c09689/IncomingWebhook/a2a3b5bb0d8b48179df41574149a5e6c/e4ae9ca5-eeac-4c99-ad5c-3fc1c29bece1";
    var firstName = $('input[id=inputFirstName]').val();
    var lastName = $('input[id=inputLastName]').val();
    var text = "<b>STUDENT REGISTRATION FORM SUBMISSION</b><br>" + firstName + " " + lastName + " has submitted a Student Registration form for " + studentFirst + " " + studentLast + " for " + course + " (" + instrument + ", " + bookLevel + ").<br><i>(ID # " + id + ")</i>";
    $.ajax({
        data: JSON.stringify({
            "text": text
        }),
        dataType: 'json',
        type: 'POST',
        url: url
    });
}