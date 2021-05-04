/** handles users pressing next on form pages **/
function next() {
    if (pageNumber === 1) {
        if (validateContactInfo()) {
            document.getElementById("parentInformation").style.display = "none";
            document.getElementById("parentInformation").style.visibility = "hidden";
            document.getElementById("studentCount").style.display = "none";
            document.getElementById("studentCount").style.visibility = "hidden";
            document.getElementById("studentNumber").innerHTML = "&mdash; Student 1";
            document.getElementById("student1Information").style.display = "inherit";
            document.getElementById("student1Information").style.visibility = "visible";
            pageNumber = 2;
            if (parseInt(globalStudentCount) === 1) {
                document.getElementById("next-1").innerHTML = '<button onclick="goToLastPage(1)" class="btn btn-success">Next</button>';
            }

        }
        goToTop();
    }
    else if (pageNumber === 2) {
        if (validateStudentInfo(1)) {
            if (globalStudentCount > 1) {
                document.getElementById("student1Information").style.display = "none";
                document.getElementById("student1Information").style.visibility = "hidden";
                document.getElementById("studentNumber").innerHTML = "&mdash; Student 2";
                document.getElementById("student2Information").style.display = "inherit";
                document.getElementById("student2Information").style.visibility = "visible";
                showInputAccompanied(2);
                changeBookLevels(2);
                pageNumber = 3;
                if (parseInt(globalStudentCount) === 2) {
                    document.getElementById("next-2").innerHTML = '<button onclick="goToLastPage(2)" class="btn btn-success">Next</button>';
                }
            }
            else {
                goToLastPage(2);
            }
        }
        goToTop();
    }
    else if (pageNumber === 3) {
        if (validateStudentInfo(2)) {
            if (globalStudentCount > 2) {
                document.getElementById("student2Information").style.display = "none";
                document.getElementById("student2Information").style.visibility = "hidden";
                document.getElementById("studentNumber").innerHTML = "&mdash; Student 3";
                document.getElementById("student3Information").style.display = "inherit";
                document.getElementById("student3Information").style.visibility = "visible";
                showInputAccompanied(3);
                changeBookLevels(3);
                pageNumber = 4;
                if (parseInt(globalStudentCount) === 3) {
                    document.getElementById("next-3").innerHTML = '<button onclick="goToLastPage(3)" class="btn btn-success">Next</button>';
                }
            }
            else {
                goToLastPage(3);
            }
        }
        goToTop();
    }
    else if (pageNumber === 4) {
        if (validateStudentInfo(3)) {
            if (globalStudentCount > 3) {
                document.getElementById("student3Information").style.display = "none";
                document.getElementById("student3Information").style.visibility = "hidden";
                document.getElementById("studentNumber").innerHTML = "&mdash; Student 4";
                document.getElementById("student4Information").style.display = "inherit";
                document.getElementById("student4Information").style.visibility = "visible";
                showInputAccompanied(4);
                changeBookLevels(4);
                pageNumber = 5;
                if (parseInt(globalStudentCount) === 4) {
                    document.getElementById("next-4").innerHTML = '<button onclick="goToLastPage(4)" class="btn btn-success">Next</button>';
                }
            }
            else {
                goToLastPage(4);
            }
        }
        goToTop();
    }
    else if (pageNumber === 5) {
        if (validateStudentInfo(4)) {
            if (globalStudentCount > 4) {
                document.getElementById("student4Information").style.display = "none";
                document.getElementById("student4Information").style.visibility = "hidden";
                document.getElementById("studentNumber").innerHTML = "&mdash; Student 5";
                document.getElementById("student5Information").style.display = "inherit";
                document.getElementById("student5Information").style.visibility = "visible";
                showInputAccompanied(5);
                changeBookLevels(5);
                pageNumber = 6;
                if (parseInt(globalStudentCount) === 5) {
                    document.getElementById("next-5").innerHTML = '<button onclick="goToLastPage(5)" class="btn btn-success">Next</button>';
                }
            }
            else {
                goToLastPage(5);
            }
        }
        goToTop();
    }
    else if (pageNumber === 6) {
        if (validateStudentInfo(5)) {
            if (globalStudentCount > 5) {
                document.getElementById("student5Information").style.display = "none";
                document.getElementById("student5Information").style.visibility = "hidden";
                document.getElementById("studentNumber").innerHTML = "&mdash; Student 6";
                document.getElementById("student6Information").style.display = "inherit";
                document.getElementById("student6Information").style.visibility = "visible";
                showInputAccompanied(6);
                changeBookLevels(6);
                pageNumber = 7;
                if (parseInt(globalStudentCount) === 6) {
                    document.getElementById("next-6").innerHTML = '<button onclick="goToLastPage(6)" class="btn btn-success">Next</button>';
                }
            }
            else {
                goToLastPage(6);
            }
        }
        goToTop();
    }
    else if (pageNumber === 7) {
        if (validateStudentInfo(6)) {
            if (globalStudentCount > 6) {
                document.getElementById("student6Information").style.display = "none";
                document.getElementById("student6Information").style.visibility = "hidden";
                document.getElementById("studentNumber").innerHTML = "&mdash; Student 7";
                document.getElementById("student7Information").style.display = "inherit";
                document.getElementById("student7Information").style.visibility = "visible";
                showInputAccompanied(7);
                changeBookLevels(7);
                pageNumber = 8;
                if (parseInt(globalStudentCount) === 7) {
                    document.getElementById("next-7").innerHTML = '<button onclick="goToLastPage(7)" class="btn btn-success">Next</button>';
                }
            }
            else {
                goToLastPage(7);
            }
        }
        goToTop();
    }
    else if (pageNumber === 8) {
        if (validateStudentInfo(7)) {
            if (globalStudentCount > 7) {
                document.getElementById("student7Information").style.display = "none";
                document.getElementById("student7Information").style.visibility = "hidden";
                document.getElementById("studentNumber").innerHTML = "&mdash; Student 8";
                document.getElementById("student8Information").style.display = "inherit";
                document.getElementById("student8Information").style.visibility = "visible";
                showInputAccompanied(8);
                changeBookLevels(8);
                pageNumber = 9;
                if (parseInt(globalStudentCount) === 8) {
                    document.getElementById("next-8").innerHTML = '<button onclick="goToLastPage(8)" class="btn btn-success">Next</button>';
                }
            }
            else {
                goToLastPage(8);
            }
        }
        goToTop();
    }
    else if (pageNumber === 9) {
        if (validateStudentInfo(8)) {
            if (globalStudentCount > 8) {
                document.getElementById("student8Information").style.display = "none";
                document.getElementById("student8Information").style.visibility = "hidden";
                document.getElementById("studentNumber").innerHTML = "&mdash; Student 9";
                document.getElementById("student9Information").style.display = "inherit";
                document.getElementById("student9Information").style.visibility = "visible";
                showInputAccompanied(9);
                changeBookLevels(9);
                pageNumber = 10;
                if (parseInt(globalStudentCount) === 9) {
                    document.getElementById("next-9").innerHTML = '<button onclick="goToLastPage(9)" class="btn btn-success">Next</button>';
                }
            }
            else {
                goToLastPage(9);
            }
        }
        goToTop();
    }
    else if (pageNumber === 10) {
        if (validateStudentInfo(9)) {
            if (globalStudentCount > 9) {
                document.getElementById("student9Information").style.display = "none";
                document.getElementById("student9Information").style.visibility = "hidden";
                document.getElementById("studentNumber").innerHTML = "&mdash; Student 10";
                document.getElementById("student10Information").style.display = "inherit";
                document.getElementById("student10Information").style.visibility = "visible";
                showInputAccompanied(10);
                changeBookLevels(10);
                pageNumber = 11;
                if (parseInt(globalStudentCount) === 10) {
                    document.getElementById("next-10").innerHTML = '<button onclick="goToLastPage(10)" class="btn btn-success">Next</button>';
                }
            }
            else {
                goToLastPage(10);
            }
        }
        goToTop();
    }
    else if (pageNumber === 11) {
        goToTop();
        goToLastPage(11);
    }
}

/** handles users pressing back on form pages **/
function back() {
    clearValidateFeedback();
    if (pageNumber === 2) {
        document.getElementById("student1Information").style.display = "none";
        document.getElementById("student1Information").style.visibility = "hidden";
        document.getElementById("studentNumber").innerHTML = "";
        document.getElementById("parentInformation").style.display = "inherit";
        document.getElementById("parentInformation").style.visibility = "visible";
        pageNumber = 1;
        goToTop();
    }
    else if (pageNumber === 3) {
        document.getElementById("student2Information").style.display = "none";
        document.getElementById("student2Information").style.visibility = "hidden";
        document.getElementById("studentNumber").innerHTML = "&mdash; Student 1";
        document.getElementById("student1Information").style.display = "inherit";
        document.getElementById("student1Information").style.visibility = "visible";
        showInputAccompanied(1);
        pageNumber = 2;
        goToTop();
    }
    else if (pageNumber === 4) {
        document.getElementById("student3Information").style.display = "none";
        document.getElementById("student3Information").style.visibility = "hidden";
        document.getElementById("studentNumber").innerHTML = "&mdash; Student 2";
        document.getElementById("student2Information").style.display = "inherit";
        document.getElementById("student2Information").style.visibility = "visible";
        showInputAccompanied(2);
        pageNumber = 3;
        goToTop();
    }
    else if (pageNumber === 5) {
        document.getElementById("student4Information").style.display = "none";
        document.getElementById("student4Information").style.visibility = "hidden";
        document.getElementById("studentNumber").innerHTML = "&mdash; Student 3";
        document.getElementById("student3Information").style.display = "inherit";
        document.getElementById("student3Information").style.visibility = "visible";
        showInputAccompanied(3);
        pageNumber = 4;
        goToTop();
    }
    else if (pageNumber === 6) {
        document.getElementById("student5Information").style.display = "none";
        document.getElementById("student5Information").style.visibility = "hidden";
        document.getElementById("studentNumber").innerHTML = "&mdash; Student 4";
        document.getElementById("student4Information").style.display = "inherit";
        document.getElementById("student4Information").style.visibility = "visible";
        showInputAccompanied(4);
        pageNumber = 5;
        goToTop();
    }
    else if (pageNumber === 7) {
        document.getElementById("student6Information").style.display = "none";
        document.getElementById("student6Information").style.visibility = "hidden";
        document.getElementById("studentNumber").innerHTML = "&mdash; Student 5";
        document.getElementById("student5Information").style.display = "inherit";
        document.getElementById("student5Information").style.visibility = "visible";
        showInputAccompanied(5);
        pageNumber = 6;
        goToTop();
    }
    else if (pageNumber === 8) {
        document.getElementById("student7Information").style.display = "none";
        document.getElementById("student7Information").style.visibility = "hidden";
        document.getElementById("studentNumber").innerHTML = "&mdash; Student 6";
        document.getElementById("student6Information").style.display = "inherit";
        document.getElementById("student6Information").style.visibility = "visible";
        showInputAccompanied(6);
        pageNumber = 7;
        goToTop();
    }
    else if (pageNumber === 9) {
        document.getElementById("student8Information").style.display = "none";
        document.getElementById("student8Information").style.visibility = "hidden";
        document.getElementById("studentNumber").innerHTML = "&mdash; Student 7";
        document.getElementById("student7Information").style.display = "inherit";
        document.getElementById("student7Information").style.visibility = "visible";
        showInputAccompanied(7);
        pageNumber = 8;
        goToTop();
    }
    else if (pageNumber === 10) {
        document.getElementById("student9Information").style.display = "none";
        document.getElementById("student9Information").style.visibility = "hidden";
        document.getElementById("studentNumber").innerHTML = "&mdash; Student 8";
        document.getElementById("student8Information").style.display = "inherit";
        document.getElementById("student8Information").style.visibility = "visible";
        showInputAccompanied(8);
        pageNumber = 9;
        goToTop();
    }
    else if (pageNumber === 11) {
        document.getElementById("student10Information").style.display = "none";
        document.getElementById("student10Information").style.visibility = "hidden";
        document.getElementById("studentNumber").innerHTML = "&mdash; Student 9";
        document.getElementById("student9Information").style.display = "inherit";
        document.getElementById("student9Information").style.visibility = "visible";
        showInputAccompanied(9);
        pageNumber = 10;
        goToTop();
    }
    // last page
    else if (pageNumber === 12) {
        var number = globalStudentCount;
        document.getElementById("lastPage").style.display = "none";
        document.getElementById("lastPage").style.visibility = "hidden";
        document.getElementById("studentNumber").innerHTML = "&mdash; Student " + number;
        document.getElementById("student" + number + "Information").style.display = "inherit";
        document.getElementById("student" + number + "Information").style.visibility = "visible";
        showInputAccompanied(number);
        pageNumber = parseInt(number) + 1;
        goToTop();
    }
}

/** goes to last page before submission (where siblings are entered)**/
function goToLastPage(number) {
    if (validateStudentInfo(number)) {
        clearValidateFeedback();
        document.getElementById("student" + number + "Information").style.display = "none";
        document.getElementById("student" + number + "Information").style.visibility = "hidden";
        document.getElementById("studentNumber").innerHTML = "";
        makeNamesToDisplay();
        document.getElementById("lastPage").style.display = "inherit";
        document.getElementById("lastPage").style.visibility = "visible";
        pageNumber = 12;
        goToTop();
    }
    else {
        goToTop();
    }
}