// meal text
$.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vRmvtTepOd7KLF6QYjegI-wsp-ZDAuT-JOaykqhScyUEbS731qerv_AM6SNIQX84Evz_VtLut66rxGb/pubhtml?gid=56981838&single=true",
    function(data, status) {
        var textTable = getTableData(data);
        var sumString = "";
        for (var i = 1; i < textTable.length; i ++) {
            sumString += "<p>" + textTable[i][0] + "</p>";
        }
        document.getElementById("mealPlanText").innerHTML = sumString;
    });
// meal data
$.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vRmvtTepOd7KLF6QYjegI-wsp-ZDAuT-JOaykqhScyUEbS731qerv_AM6SNIQX84Evz_VtLut66rxGb/pubhtml?gid=1223661694&single=true",
    function(data, status) {
        document.getElementById("mealPrice").innerText = getTableData(data)[1][1];
    });
// housing text
$.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vRmvtTepOd7KLF6QYjegI-wsp-ZDAuT-JOaykqhScyUEbS731qerv_AM6SNIQX84Evz_VtLut66rxGb/pubhtml?gid=869859262&single=true",
    function(data, status) {
        var textTable = getTableData(data);
        var sumString = "";
        for (var i = 1; i < textTable.length; i ++) {
            sumString += "<p>" + textTable[i][0] + "</p>";
        }
        document.getElementById("housingText").innerHTML = sumString;
    });
// housing data
$.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vRmvtTepOd7KLF6QYjegI-wsp-ZDAuT-JOaykqhScyUEbS731qerv_AM6SNIQX84Evz_VtLut66rxGb/pubhtml?gid=256271385&single=true",
    function(data, status) {
        var housingData = getTableData(data);
        var housingInputs = "";
        var housingList = "";
        var nameList = "";
        var priceList = "";
        for (var i = 1; i < housingData.length; i++) {
            housingList += housingData[i][0].toLowerCase().replace(/ /g, '') + ";;;";
            nameList += housingData[i][0] + ";;;";
            priceList += housingData[i][1] + ";;;";
            if (parseInt(housingData[i][4]) > 0) {
                var firstLine = "<div class=\"form-group\">";
                var secondLine = "<label for=\"input" + housingData[i][0].toLowerCase().replace(/ /g, '') + "\"><b>" + housingData[i][0] + " - $" + housingData[i][1] + "</b></label> &nbsp;&nbsp;";
                var thirdLine = "<input style=\"max-width: 400px\" type=\"number\" min=\"0\" max=\"" + housingData[i][4] + "\" class=\"form-control\" value='0' id=\"input" + housingData[i][0].toLowerCase().replace(/ /g, '') + "\">";
                var fourthLine = "<small id=\"emailHelp\" class=\"form-text text-muted\">" + housingData[i][4] + " remaining </small>";
                var fifthLine = "</div>";
                housingInputs += firstLine + secondLine + thirdLine + fourthLine + fifthLine;
            }
        }
        document.getElementById("housingInputs").innerHTML = housingInputs;
        document.getElementById("housingList").innerText = housingList;
        document.getElementById("nameList").innerText = nameList;
        document.getElementById("priceList").innerText = priceList;
    }).done(function() {
    document.getElementById("container").style.display = "inherit";
    document.getElementById("container").style.visibility = "visible";
    document.getElementById("pre").style.display = "none";
    document.getElementById("pre").style.visibility = "hidden";
})


function getTableData(inputData) {
    var array1 = inputData.toString().split("<table");
    var array2 = array1[1].split("</table>");
    var string = "<table" + array2[0] + "</table>";
    document.getElementById("hidden").innerHTML = string;
    var myTableArray = [];
    $("table tr").each(function() {
        var arrayOfThisRow = [];
        var tableData = $(this).find('td');
        if (tableData.length > 0) {
            tableData.each(function() { arrayOfThisRow.push($(this).text()); });
            myTableArray.push(arrayOfThisRow);
        }
    });
    return myTableArray;
}

function getSelectData(name) {
    var e = document.getElementById(name);
    var value = e.options[e.selectedIndex].value;
    return value;
}

function submit() {
    document.getElementById("container").style.display = "none";
    document.getElementById("container").style.visibility = "hidden";
    document.getElementById("pre").style.display = "inherit";
    document.getElementById("pre").style.visibility = "visible";
    $('html,body').scrollTop(0);
    window.parent.postMessage("scrollTop", '*');
    if (validate()) {
        submitGoogleForm();
        submitPaymentForm();
    }
    else {
        document.getElementById("errorMessage").innerHTML = "<h3 style='color:red'>Please correct the issue(s) indicated below in order to complete your form submission!</h3><hr>";
        document.getElementById("container").style.display = "inherit";
        document.getElementById("container").style.visibility = "visible";
        document.getElementById("pre").style.display = "none";
        document.getElementById("pre").style.visibility = "hidden"
    }
}

function submitGoogleForm() {
    var housingString = document.getElementById("housingList").innerText;
    var housingList = housingString.split(";;;");
    var dataArray = "";
    for (var i = 0; i < housingList.length - 1; i ++) {
        if (document.getElementById("input" + housingList[i]) != null) {
            dataArray += document.getElementById("input" + housingList[i]).value + ";;;";
        }
        else {
            dataArray += "0;;;";
        }
    }
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
        'entry.975589451': $('input[id=inputMealPlanCount]').val(),
        'entry.616708405': dataArray
    }
    // process the form
    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'https://docs.google.com/forms/d/e/1FAIpQLSdrotzMctO4vAOOtdsr16hHvL05yOif2tVb8Pgb8STiFlJHdQ/formResponse', // the url where we want to POST
        data        : formData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode          : true
    })
    // using the done promise callback
        .done(function(data) {

        });
}

function submitPaymentForm() {
    var formInputs = "";

    var mealPlanCount = parseInt(document.getElementById("inputMealPlanCount").value);
    if (mealPlanCount > 0) {
        var line0 = "<div id=\"" + "meal_plan" + "\">";
        var line1 = "<input type=\"hidden\" name=\"PartNo\" value=\"" + "Meal Plan" + "\">";
        var line2 = "<input type=\"hidden\" name=\"Item\" value=\"" + "Meal Plan" + "\">";
        var line3 = "<input id=\"qty_meal_plan\" type=\"hidden\" name=\"Qty\" value=" + mealPlanCount + ">";
        var line4 = "<input type=\"hidden\" name=\"Price\" value=" + document.getElementById("mealPrice").innerText + ">";
        var line5 = "</div>";
        formInputs = line0 + line1 + line2 + line3 + line4 + line5;
    }

    var housingString = document.getElementById("housingList").innerText;
    var housingList = housingString.split(";;;");
    var nameString = document.getElementById("nameList").innerText;
    var nameList = nameString.split(";;;");
    var priceString = document.getElementById("priceList").innerText;
    var priceList = priceString.split(";;;");
    for (var i = 0; i < housingList.length - 1; i ++) {
        if (document.getElementById("input" + housingList[i]) != null) {
            var count = parseInt(document.getElementById("input" + housingList[i]).value);
            if (count > 0) {
                var line0 = "<div id=\"" + housingList[i] + "\">";
                var line1 = "<input type=\"hidden\" name=\"PartNo\" value=\"" + nameList[i] + "\">";
                var line2 = "<input type=\"hidden\" name=\"Item\" value=\"" + nameList[i] + "\">";
                var line3 = "<input id=\"qty_" + housingList[i] + "\" type=\"hidden\" name=\"Qty\" value=" + count + ">";
                var line4 = "<input type=\"hidden\" name=\"Price\" value=" + priceList[i] + ">";
                var line5 = "</div>";
                formInputs += line0 + line1 + line2 + line3 + line4 + line5;
            }
        }
    }
    document.getElementById("payFormInputs").innerHTML = formInputs;
    document.getElementById("payform").submit();
}

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

    var mealCount = $('input[id=inputMealPlanCount]').val();
    if (mealCount > 0) {
        hasMeals = true;
    }

    var housingString = document.getElementById("housingList").innerText;
    var housingList = housingString.split(";;;");
    for (var i = 0; i < housingList.length - 1; i ++) {
        if (document.getElementById("input" + housingList[i]) != null) {
            var count = parseInt(document.getElementById("input" + housingList[i]).value);
            if (count > 0) {
                hasHousing = true;
                break;
            }
        }
    }

    if (!hasMeals && !hasHousing) {
        document.getElementById("noItemsErrorMessage").innerHTML = "<h4 style='color:red'>Please select housing and/or a meal plan to purchase!</h4><hr>";
        valid = false;
    }

    return valid;
}

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

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
