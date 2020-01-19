/** advances to one of three forms based on choice **/
function submit() {
    var choice = getRadioButtonValue("week");
    if (choice != null) {
        var url = "";
        if (choice === "week1") {
            url = "https://ithaca-ces.github.io/suzuki/week1-housing-meals.html";
        }
        else if (choice === "week2") {
            url = "https://ithaca-ces.github.io/suzuki/week2-housing-meals.html";
        }
        else if (choice === "weeks1and2") {
            url = "https://ithaca-ces.github.io/suzuki/weeks1and2-housing-meals.html";
        }

        window.location.href = url;

    }
}