/** submit google form **/
function submitGoogleForm(registrationID) {
    var housingString = document.getElementById("housingList").innerText;
    var housingList = housingString.split(";;;");
    var dataArray = "";
    for (var i = 0; i < housingList.length - 1; i ++) {
        if (document.getElementById("input" + housingList[i]) != null) {
            dataArray += document.getElementById("input" + housingList[i]).value + ";;;;;;";
        }
        else {
            dataArray += "0;;;;;;";
        }
    }
    var mealPlanCount = document.getElementById("inputMealPlanCount").value;
    var mealPlanDataArray = "";
    for (var i = 1; i <= mealPlanCount; i ++) {
        mealPlanDataArray += document.getElementById("inputFirstNameMealPlan-" + i).value + " " + document.getElementById("inputLastNameMealPlan-" + i).value + ", ";
    }
    mealPlanDataArray = mealPlanDataArray.substring(0, mealPlanDataArray.length - 2);
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
        'entry.2015316342': document.getElementById('inputAccommodations').value,
        'entry.616708405': dataArray,
        'entry.1271883661': mealPlanDataArray,
        'entry.55548226': registrationID
    }
    // process the form
    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'https://docs.google.com/forms/d/e/1FAIpQLSdrotzMctO4vAOOtdsr16hHvL05yOif2tVb8Pgb8STiFlJHdQ/formResponse', // the url where we want to POST
        data        : formData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode          : true,
    })
    // using the done promise callback
        .done(function(data) {

        });
}

/** web hook to Microsoft Teams **/
function webHook(registrationID) {
    var url = "https://outlook.office.com/webhook/26a7efc0-83ae-498b-9804-aadcf71f0f6c@fa1ac8f6-5e54-4857-9f0b-4aa422c09689/IncomingWebhook/1fcbfd4673c04aaeb026b119a3d68f73/e4ae9ca5-eeac-4c99-ad5c-3fc1c29bece1";
    var firstName = $('input[id=inputFirstName]').val();
    var lastName = $('input[id=inputLastName]').val();
    var list = "";
    var mealPlanCount = parseInt(document.getElementById("inputMealPlanCount").value);
    if (mealPlanCount > 0) {
        list += "<li><b>Meal Plans ($" + document.getElementById("mealPrice").innerText + "):</b> " + mealPlanCount + "</li>";
        var mealPlanDataArray = "";
        for (var i = 1; i <= mealPlanCount; i ++) {
            mealPlanDataArray += document.getElementById("inputFirstNameMealPlan-" + i).value + " " + document.getElementById("inputLastNameMealPlan-" + i).value + ", ";
        }
        mealPlanDataArray = mealPlanDataArray.substring(0, mealPlanDataArray.length - 2);
        list += "<li><b>Meal Plan People:</b> " + mealPlanDataArray + "</li>";
    }
    var housingString = document.getElementById("housingList").innerText;
    var housingList = housingString.split(";;;");
    var nameString = document.getElementById("nameList").innerText;
    var nameList = nameString.split(";;;");
    var priceString = document.getElementById("priceList").innerText;
    var priceList = priceString.split(";;;");
    for (var i = 0; i < housingList.length - 1; i++) {
        if (document.getElementById("input" + housingList[i]) != null) {
            var count = parseInt(document.getElementById("input" + housingList[i]).value);
            if (count > 0) {
                list += "<li><b>" + nameList[i] + " ($" + priceList[i] + ")</b>: " + count + "</li>";
            }
        }
    }
    var text = "<b>WEEK 1 HOUSING & MEALS SUBMISSION</b><br>" + firstName + " " + lastName + " has submitted a Week 1 Housing & Meals Form:<br><ul>" + list + "</ul><i>(ID # " + registrationID + ")</i>";
    $.ajax({
        data: JSON.stringify({
            "text": text
        }),
        dataType: 'json',
        type: 'POST',
        url: url
    });
}

/** submits payment form **/
function submitPaymentForm(registrationID) {
    var hasHousing = false;
    var hasMealPlans = false;

    var housingString = document.getElementById("housingList").innerText;
    var housingList = housingString.split(";;;");
    var priceString = document.getElementById("priceList").innerText;
    var priceList = priceString.split(";;;");

    var housingTotal = 0;
    for (var i = 0; i < housingList.length - 1; i ++) {
        if (document.getElementById("input" + housingList[i]) != null) {
            var count = parseInt(document.getElementById("input" + housingList[i]).value);
            if (count > 0) {
                hasHousing = true;
                housingTotal += count * parseFloat(priceList[i]);
            }
        }
    }

    var mealPlanCount = parseInt(document.getElementById("inputMealPlanCount").value);
    var mealPlanPrice = parseFloat(document.getElementById("mealPrice").innerText);
    var mealPlanTotal = 0;

    if (mealPlanCount > 0) {
        mealPlanTotal = mealPlanCount * mealPlanPrice;
        hasMealPlans = true;
    }

    var title = "Suzuki Week 1 ";
    var totalPrice = 0;
    if (hasHousing && hasMealPlans) {
        title += "Housing & Meals";
        totalPrice = mealPlanTotal + housingTotal;
    }
    else if (hasHousing) {
        title += "Housing";
        totalPrice = housingTotal;
    }
    else if (hasMealPlans) {
        title += "Meals";
        totalPrice = mealPlanTotal;
    }
    title += " (ID " + registrationID + ")";

    var line0 = "<div id=housing_meals>";
    var line1 = '<input type=hidden name=PartNo value="' + title + '">';
    var line2 = '<input type=hidden name=Item value="' + title + '">';
    var line3 = '<input id=qty_housing_meals type=hidden name=Qty value="1">';
    var line4 = '<input type=hidden name=Price value="' + totalPrice + '">';
    var line5 = '</div>';
    var formInputs = line0 + line1 + line2 + line3 + line4 + line5;

    document.getElementById("payFormInputs").innerHTML = formInputs;
    document.getElementById("payform").submit();
}