/** displays fields to input names if they select having siblings **/
function displaySiblingQuestion() {
    var radioButtonValue = getRadioButtonValue("hasSiblings");
    if (radioButtonValue === "yes") {
        document.getElementById("siblings").style.display = "";
        document.getElementById("siblings").style.visibility = "visible";
    }
    else {
        document.getElementById("siblings").style.display = "none";
        document.getElementById("siblings").style.visibility = "hidden";
        // hide all fields except 1 and clear fields
        for (var i = 2; i <= 15; i ++) {
            document.getElementById("siblings-" + i).style.display = "none";
            document.getElementById("siblings-" + i).style.visibility = "hidden";
            document.getElementById("inputSiblingFirstName-" + i).value = "";
            document.getElementById("inputSiblingLastName-" + i).value = "";
        }
        document.getElementById("inputSiblingFirstName-" + 1).value = "";
        document.getElementById("inputSiblingLastName-" + 1).value = "";
    }
}

/** makes list of unregistered siblings **/
function makeSiblingsString() {
    var siblingString = "";
    var hasSiblings = getRadioButtonValue("hasSiblings");
    if (hasSiblings === "yes") {
        for (var i = 1; i <= 15; i++) {
            var firstName = document.getElementById("inputSiblingFirstName-" + i).value;
            var lastName = document.getElementById("inputSiblingLastName-" + i).value;
            if (!isBlank(firstName) && !isBlank(lastName)) {
                siblingString += firstName + " " + lastName + " (N), ";
            }
        }
    }
    return siblingString;
}

/** names of registered students except for that number **/
function makeNamesString(exceptNumber) {
    var nameString = "";
    for (var i = 1; i <= globalStudentCount; i++) {
        if (i !== (exceptNumber)) {
            var firstName = $('input[id=inputStudentFirstName-' + i + ']').val();
            var lastName = $('input[id=inputStudentLastName-' + i + ']').val();
            nameString += firstName + " " + lastName + " (R), ";
        }
    }
    return nameString;
}

/** detects if sibling # has been filled out, and if so, adds another field **/
function inputDetect(siblingNumber) {
    if (siblingNumber < 15) {
        var firstName = document.getElementById("inputSiblingFirstName-" + siblingNumber).value;
        var lastName = document.getElementById("inputSiblingLastName-" + siblingNumber).value;
        if (!isBlank(firstName) && !isBlank(lastName)) {
            var nextNumber = siblingNumber + 1;
            document.getElementById("siblings-" + nextNumber).style.display = "";
            document.getElementById("siblings-" + nextNumber).style.visibility = "visible";
        }
    }
}

/** validates sibling questions **/
function validateSiblings() {
    var valid = true;
    var hasSiblings = getRadioButtonValue("hasSiblings");
    // if question not answered
    if (hasSiblings == null) {
        valid = false;
        document.getElementById("valid-feedback-inputHasSiblings").innerHTML = "<br><font color='red'>Please select a choice.</font>"
        document.getElementById("hasSiblings-yes").style.color = "red";
        document.getElementById("hasSiblings-no").style.color = "red";
    }
    else {
        // if they chose yes
        if (hasSiblings === "yes") {
            var siblingsFields = ["SiblingFirstName", "SiblingLastName"];
            var nameFields = ["first name", "last name"];
            for (var i = 0; i < siblingsFields.length; i ++) {
                var siblingField = document.getElementById("input" + siblingsFields[i] + "-1");
                // if valid
                if (siblingField.value !== "") {
                    siblingField.classList.add("is-valid");
                }
                // if not valid
                else {
                    valid = false;
                    document.getElementById("valid-feedback-input" + siblingsFields[i]).innerHTML = "<font color='red'>Please enter a " + nameFields[i] + ".</>"
                }
            }
        }
    }
    return valid;
}

/** clears sibling questions feedback **/
function clearValidateFeedbackForSiblings() {
    var fields = ["SiblingFirstName", "SiblingLastName"];
    for (var i = 0; i < fields.length; i ++) {
        var inputField = document.getElementById("input" + fields[i] + "-1");
        inputField.classList.remove("is-invalid");
        inputField.classList.remove("is-valid");
        document.getElementById("valid-feedback-input" + fields[i]).innerHTML = "";
    }
    document.getElementById("valid-feedback-inputHasSiblings").innerHTML = "";
    document.getElementById("hasSiblings-yes").style.color = "";
    document.getElementById("hasSiblings-no").style.color = "";
}