/** runs when a user selects a course (per page) **/
function changeOnCourseSelection(number) {
    changeShowEnrichmentCourses(number);
    changeBookLevels(number);
}

/** runs when a user selects a piece code (per page) **/
function changeOnPieceCodeSelection(number) {
    changeMovements(number);
    changeCustomPiece(number);
}

/** changes options on book level field (per page) **/
function changeBookLevels(number) {
    var instrument = getSelectData("inputInstrument-" + number);
    if (instrument !== "") {
        var selectedInstrument = capitalizeFLetter(instrument);
        var bookNumbers = codeDictionary[selectedInstrument].bookOptions;
        var bookNumbersArray = bookNumbers.split(",");
        var select = document.getElementById("inputBookLevel-" + number);
        select.innerHTML = '<option style="display:none" disabled selected value></option>';
        for (var i = 0; i < bookNumbersArray.length; i++) {
            var option = document.createElement("option");
            option.text = bookNumbersArray[i];
            option.value = bookNumbersArray[i];
            select.add(option);
        }
        var selectedCourse = getSelectData("inputCourse-" + number);
        if (selectedCourse.includes("advancedinstitute")) {
            option = document.createElement("option");
            option.text = "N/A";
            option.value = "N/A";
            select.add(option);
        }
        changePieceCodes(number);
    }
}

/** changes options on piece code field (per page) **/
function changePieceCodes(number) {
    var selectedInstrument = capitalizeFLetter(getSelectData("inputInstrument-" + number));
    var selectedBookLevel = getSelectData("inputBookLevel-" + number);
    var allBookNumbers = codeDictionary[selectedInstrument].bookList;
    var allCodes = codeDictionary[selectedInstrument].codeList;
    var allTitles = codeDictionary[selectedInstrument].titleList;
    var pieces = [];
    var codes = [];
    for (var i = 0; i < allBookNumbers.length; i ++) {
        if (allBookNumbers[i] === selectedBookLevel) {
            var title = allTitles[i];
            pieces.push(allCodes[i] + ": " + title.substring(1, title.length-1));
            codes.push(allCodes[i]);
        }
    }
    var select = document.getElementById("inputTitle-" + number);
    select.innerHTML = '<option style="display:none" disabled selected value></option>';
    for (var i = 0; i < pieces.length; i ++) {
        var option = document.createElement("option");
        option.value = codes[i];
        option.text = pieces[i];
        select.add(option);
    }
    var selectedCourse = getSelectData("inputCourse-" + number);
    if (selectedCourse.includes("advancedinstitute")) {
        option = document.createElement("option");
        option.text = "Other";
        option.value = "other";
        select.add(option);
        if (selectedBookLevel === "N/A") {
            option.selected = "selected";
        }
    }
    changeCustomPiece(number);
    changeMovements(number);
}

/** changes options on piece code field (per page) **/
function changeMovements(number) {
    var movementDiv = document.getElementById("movementColumn-" + number);
    movementDiv.style.visibility = "hidden";
    movementDiv.style.display = "none";
    var select = document.getElementById("inputMovement-" + number);
    select.innerHTML = '<option style="display:none" disabled selected value></option>';
    var selectedInstrument = capitalizeFLetter(getSelectData("inputInstrument-" + number));
    var selectedCode = getSelectData("inputTitle-" + number);
    var allCodes = codeDictionary[selectedInstrument].codeList;
    var allMovements = codeDictionary[selectedInstrument].movementsList;
    var movements = [];
    for (var i = 0; i < allCodes.length; i ++) {
        if (allCodes[i] === selectedCode) {
            var movements = allMovements[i];
            break;
        }
    }
    if (movements.length >= 1) {
        var movementArray = movements.split("-");
        for (var i = 0; i < movementArray.length; i++) {
            var option = document.createElement("option");
            option.text = movementArray[i];
            option.value = movementArray[i];
            select.add(option);
        }
        movementDiv.style.visibility = "visible";
        movementDiv.style.display = "";
    }
}

/** shows custom piece field is criteria is met (per page) **/
function changeCustomPiece(number) {
    var selectedCourse = getSelectData("inputCourse-" + number);
    var selectedCode = getSelectData("inputTitle-" + number);
    var customField = document.getElementById("customPieceDiv-" + number);
    if (selectedCourse.includes("advancedinstitute") && selectedCode === "other") {
        customField.style.visibility = "visible";
        customField.style.display = "";
    }
    else {
        customField.style.visibility = "hidden";
        customField.style.display = "none";
        document.getElementById("inputCustomPiece-" + number).value = "";
    }
}

/** displays fields for adult accompanying student is criteria is met (per page) **/
function showInputAccompanied(number) {
    var value = getSelectData("inputAccompanied-" + number);
    if (value === "designatedAdult") {
        document.getElementById("designatedAdultInfo-" + number).style.display = "inherit";
        document.getElementById("designatedAdultInfo-" + number).style.visibility = "visible";
    }
}

/** updates choices in accompanying student field based on age input (per page) **/
function updateAccompanyDropDown(number) {
    var value = document.getElementById("inputAge-" + number).value;
    var select = document.getElementById("inputAccompanied-" + number);
    if (value >= 13) {
        if (select.length < 4) {
            var option = document.createElement("option");
            option.text = "No One (student will be 13 by July 1, " + new Date().getFullYear() + " and will reside in the teen residence hall)";
            option.value = "noone";
            select.add(option);
        }
    }
    else {
        select.remove(3);
    }
}


window.getCount = function(parent, getChildrensChildren){
    var relevantChildren = 0;
    var children = parent.childNodes.length;
    for(var i=0; i < children; i++){
        if(parent.childNodes[i].nodeType != 3){
            if(getChildrensChildren)
                relevantChildren += getCount(parent.childNodes[i],true);
            relevantChildren++;
        }
    }
    return relevantChildren;
}


$(document).ready(function(){
    $("#inputAge-1").change(function(){
        updateAccompanyDropDown(1);
    });
    $("#inputAge-2").change(function(){
        updateAccompanyDropDown(2);
    });
    $("#inputAge-3").change(function(){
        updateAccompanyDropDown(3);
    });
    $("#inputAge-4").change(function(){
        updateAccompanyDropDown(4);
    });
    $("#inputAge-5").change(function(){
        updateAccompanyDropDown(5);
    });
    $("#inputAge-6").change(function(){
        updateAccompanyDropDown(6);
    });
    $("#inputAge-7").change(function(){
        updateAccompanyDropDown(7);
    });
    $("#inputAge-8").change(function(){
        updateAccompanyDropDown(8);
    });
    $("#inputAge-9").change(function(){
        updateAccompanyDropDown(9);
    });
    $("#inputAge-10").change(function(){
        updateAccompanyDropDown(10);
    });

});

/** updates designated adult fields if dropdown is changed (per page) **/
function changeDesignatedAdult(number) {
    var selectedOption = getSelectData("inputAccompanied-" + number);
    if (selectedOption === "designatedAdult") {
        document.getElementById("designatedAdultInfo-" + number).style.display = "inherit";
        document.getElementById("designatedAdultInfo-" + number).style.visibility = "visible";
    }
    else {
        var fields = ["FirstName", "LastName", "Address", "City", "State", "Zip", "PhoneNumber"];
        for (var i = 0; i < fields.length; i ++) {
            var inputField = document.getElementById("inputDesignatedAdult" + fields[i] + "-" + number);
            inputField.value = "";
        }
        document.getElementById("designatedAdultInfo-" + number).style.display = "none";
        document.getElementById("designatedAdultInfo-" + number).style.visibility = "hidden";
    }
}

/** shows enrichment fields if criteria is met (per page) **/
function changeShowEnrichmentCourses(number) {
    var selectedOption = getSelectData("inputCourse-" + number);
    if (!selectedOption.toLowerCase().includes("advanced")) {
        document.getElementById("enrichmentClassesDiv-" + number).style.display = "inherit";
        document.getElementById("enrichmentClassesDiv-" + number).style.visibility = "visible";
    }
    else {
        var fields = document.getElementsByClassName("enrichment-select");
        for (var i = 0; i < fields.length; i ++) {
            var inputField = fields[i];
            inputField.value = " ";
        }
        document.getElementById("enrichmentClassesDiv-" + number).style.display = "none";
        document.getElementById("enrichmentClassesDiv-" + number).style.visibility = "hidden";
    }
}