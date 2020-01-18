/** makes a table from data from Google Spreadsheet **/
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

/** gets radio button value **/
function getRadioButtonValue(name) {
    var radios = document.getElementsByName(name);
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return null;
}

/** validates an email address by regex **/
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/** get value of selected choice **/
function getSelectData(name) {
    var e = document.getElementById(name);
    var value = e.options[e.selectedIndex].value;
    return value;
}

/** get title of selected choice **/
function getSelectDataTitle(name) {
    var e = document.getElementById(name);
    var value = e.options[e.selectedIndex].text;
    return value;
}

/** go to top of page **/
function goToTop() {
    $('html,body').scrollTop(0);
    window.parent.postMessage("scrollTop", '*');
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function capitalizeFLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}