function submitGoogleForm() {
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
        'entry.255990349': mealPlanDataArray,
        'entry.834943981': $('input[id=inputID]').val()
    }
    // process the form
    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'https://docs.google.com/forms/d/e/1FAIpQLSdprLZmFgZ-rVDSkVSZPI0r5hEx_EFLO7eW7FhH2dQeU0csWw/formResponse', // the url where we want to POST
        data        : formData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode          : true
    })
    // using the done promise callback
        .done(function(data) {

        });
}

/** web hook to Microsoft Teams **/
function webHook() {
    var url = "https://outlook.office.com/webhook/26a7efc0-83ae-498b-9804-aadcf71f0f6c@fa1ac8f6-5e54-4857-9f0b-4aa422c09689/IncomingWebhook/a2a3b5bb0d8b48179df41574149a5e6c/e4ae9ca5-eeac-4c99-ad5c-3fc1c29bece1";
    var firstName = $('input[id=inputFirstName]').val();
    var lastName = $('input[id=inputLastName]').val();
    var id = $('input[id=inputID]').val();
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
    var text = "<b>WEEKS 1 AND 2 HOUSING & MEALS SUBMISSION</b><br>" + firstName + " " + lastName + " has submitted a Weeks 1 and 2 Housing & Meals Form:<br><ul>" + list + "</ul><i>(ID # " + id + ")</i>";
    $.ajax({
        data: JSON.stringify({
            "text": text
        }),
        dataType: 'json',
        type: 'POST',
        url: url
    });
}