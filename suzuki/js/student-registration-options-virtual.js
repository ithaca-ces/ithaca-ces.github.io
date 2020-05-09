/** runs when a user selects a course (per page) **/
function changeOnCourseSelection(number) {
    changeInstruments(number);
    var bookLevelSelect = document.getElementById("inputBookLevel-" + number);
    bookLevelSelect.innerHTML = '<option style="display:none" disabled selected value></option>';
    var titleSelect = document.getElementById("inputTitle-" + number);
    titleSelect.innerHTML = '<option style="display:none" disabled selected value></option>';
    changeShowEnrichmentCourses(number);
    changeMovements(number, false);
    changeCustomPiece(number);
    changeAccompanyOptions(number);
}

/** runs when a user selects a piece code (per page) **/
function changeOnPieceCodeSelection(number) {
    changeMovements(number, true);
    changeCustomPiece(number);
}

/** changes options on instrument field (per page) **/
function changeInstruments(number) {
    var selectedCourse = getSelectData("inputCourse-" + number);
    var select = document.getElementById("inputInstrument-" + number);
    select.innerHTML = '<option style="display:none" disabled selected value></option>';
    if (selectedCourse === anyInstrumentLevelOptionValue || selectedCourse === advancedInstituteOptionValue) {
        for (var i = 0; i < instrumentNames.length; i ++) {
            var option = document.createElement("option");
            option.text = instrumentNames[i];
            option.value = instrumentValues[i];
            select.add(option);
        }
        select.disabled = false;
    }
    if (selectedCourse === heifetzViolinProgramOptionValue) {
        select.innerHTML = '<option selected value="violin">Violin</option>';
        select.disabled = true;
        setTimeout(() => { changeBookLevels(number, "violin") }, 100);
    }
}


/** changes options on book level field (per page) **/
function changeBookLevels(number, inputInstrument) {
    var instrument = inputInstrument;
    if (instrument === "") {
        instrument = getSelectData("inputInstrument-" + number);
    }
    var selectedCourse = getSelectData("inputCourse-" + number);
    if (selectedCourse.includes("heifetzviolinprogram")) {
        instrument = "violin";
    }
    var select = document.getElementById("inputBookLevel-" + number);
    select.innerHTML = '<option style="display:none" disabled selected value></option>';
    if (instrument !== "") {
        var selectedInstrument = capitalizeFLetter(instrument);
        var bookNumbers = codeDictionary[selectedInstrument].bookOptions;
        var bookNumbersArray = bookNumbers.split(",");
        for (var i = 0; i < bookNumbersArray.length; i++) {
            var option = document.createElement("option");
            option.text = bookNumbersArray[i];
            option.value = bookNumbersArray[i];
            select.add(option);
        }
        if (selectedCourse.includes("advancedinstitute") || selectedCourse.includes("heifetzviolinprogram")) {
            option = document.createElement("option");
            option.text = "N/A";
            option.value = "N/A";
            select.add(option);
        }
        changePieceCodes(number, "");
    }
}

/** changes options on piece code field (per page) **/
function changePieceCodes(number, inputInstrument) {
    var selectedInstrument = inputInstrument;
    if (selectedInstrument === "") {
        selectedInstrument = capitalizeFLetter(getSelectData("inputInstrument-" + number));
    }
    var selectedBookLevel = getSelectData("inputBookLevel-" + number);
    var select = document.getElementById("inputTitle-" + number);
    select.disabled = false;
    select.innerHTML = '<option style="display:none" disabled selected value></option>';
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
    for (var i = 0; i < pieces.length; i ++) {
        var option = document.createElement("option");
        option.value = codes[i];
        option.text = pieces[i];
        select.add(option);
    }
    var selectedCourse = getSelectData("inputCourse-" + number);
    if (selectedCourse.includes("advancedinstitute") || selectedCourse.includes("heifetzviolinprogram")) {
        option = document.createElement("option");
        option.text = "Other";
        option.value = "other";
        select.add(option);
        if (selectedBookLevel === "N/A") {
            option.selected = "selected";
            select.disabled = true;
        }
    }
    changeCustomPiece(number);
    changeMovements(number, true);
}

/** changes options on piece code field (per page) **/
function changeMovements(number, shouldRun) {
    var movementDiv = document.getElementById("movementColumn-" + number);
    movementDiv.style.visibility = "hidden";
    movementDiv.style.display = "none";
    var select = document.getElementById("inputMovement-" + number);
    select.innerHTML = '<option style="display:none" disabled selected value></option>';
    if (shouldRun) {
        var selectedInstrument = capitalizeFLetter(getSelectData("inputInstrument-" + number));
        var selectedCode = getSelectData("inputTitle-" + number);
        var allCodes = codeDictionary[selectedInstrument].codeList;
        var allMovements = codeDictionary[selectedInstrument].movementsList;
        var movements = [];
        for (var i = 0; i < allCodes.length; i++) {
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
}

/** shows custom piece field is criteria is met (per page) **/
function changeCustomPiece(number) {
    var selectedCourse = getSelectData("inputCourse-" + number);
    var selectedCode = getSelectData("inputTitle-" + number);
    var customField = document.getElementById("customPieceDiv-" + number);
    if ((selectedCourse.includes("advancedinstitute") || selectedCourse.includes("heifetzviolinprogram")) && selectedCode === "other") {
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
            option.text = "No One (student will be 13 by July 1, " + new Date().getFullYear() + " and will stay with an Ithaca Host Family)";
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
        changeAccompanyOptions(1);
    });
    $("#inputAge-2").change(function(){
        changeAccompanyOptions(2);
    });
    $("#inputAge-3").change(function(){
        changeAccompanyOptions(3);
    });
    $("#inputAge-4").change(function(){
        changeAccompanyOptions(4);
    });
    $("#inputAge-5").change(function(){
        changeAccompanyOptions(5);
    });
    $("#inputAge-6").change(function(){
        changeAccompanyOptions(6);
    });
    $("#inputAge-7").change(function(){
        changeAccompanyOptions(7);
    });
    $("#inputAge-8").change(function(){
        changeAccompanyOptions(8);
    });
    $("#inputAge-9").change(function(){
        changeAccompanyOptions(9);
    });
    $("#inputAge-10").change(function(){
        changeAccompanyOptions(10);
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
    if (!selectedOption.toLowerCase().includes("advancedinstitute") && !selectedOption.toLowerCase().includes("heifetzviolinprogram")) {
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

function changeAccompanyOptions(number) {
    // put in base values
    var theSelect = document.getElementById("inputAccompanied-" + number);
    theSelect.innerHTML = '<option style="display:none" disabled selected value="none"></option>';
    /*for (var i = 0; i < accompanyNames.length - 1; i++) {
        var option = document.createElement("option");
        option.text = accompanyNames[i];
        option.value = accompanyValues[i];
        theSelect.add(option);
    }
    // get course
    var courseValue = getSelectData("inputCourse-" + number);
    // get age
    var ageValue = document.getElementById("inputAge-" + number).value;
    // if course is advanced and age is >= 13, then show the fourth option
    if (courseValue.toLowerCase().includes("advancedinstitute") && ageValue >= 13) {
        option = document.createElement("option");
        option.text = "No One (student will be 13 by July 1, " + new Date().getFullYear() + " and will stay with an Ithaca Host Family)";
        option.value = "noone";
        theSelect.add(option);
    }
    changeDesignatedAdult(number);*/
}