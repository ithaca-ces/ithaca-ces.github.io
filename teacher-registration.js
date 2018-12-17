var url_string = window.location.href;
var url = new URL(url_string);
window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var everyChildCan = urlParams.get("every_child_can");
    var violinBook1 = urlParams.get("violin_book_1");
    var violinBook2 = urlParams.get("violin_book_2");
    var violinBook3 = urlParams.get("violin_book_3");
    var violinBook4 = urlParams.get("violin_book_4");
    var violinBook5 = urlParams.get("violin_book_5");
    var balancePoint = urlParams.get("balance_point");
    var openHeart = urlParams.get("open_heart");
    var celloBook1 = urlParams.get("cello_book_1");
    var celloBook3 = urlParams.get("cello_book_3");
    var observer1 = urlParams.get("observer_1");
    var observer2 = urlParams.get("observer_2");

    if (everyChildCan != null && everyChildCan != "") {
        document.getElementById("qty_every_child_can").value = everyChildCan;
    } else {
        var elem = document.getElementById('every_child_can');
        elem.parentNode.removeChild(elem);
    }
    if (violinBook1 != null && violinBook1 != "") {
        document.getElementById("qty_violin_book_1").value = violinBook1;
    } else {
        var elem = document.getElementById('violin_book_1');
        elem.parentNode.removeChild(elem);
    }
    if (violinBook2 != null && violinBook2 != "") {
        document.getElementById("qty_violin_book_2").value = violinBook2;
    } else {
        var elem = document.getElementById('violin_book_2');
        elem.parentNode.removeChild(elem);
    }
    if (violinBook3 != null && violinBook3 != "") {
        document.getElementById("qty_violin_book_3").value = violinBook3;
    } else {
        var elem = document.getElementById('violin_book_3');
        elem.parentNode.removeChild(elem);
    }
    if (violinBook4 != null && violinBook4 != "") {
        document.getElementById("qty_violin_book_4").value = violinBook4;
    } else {
        var elem = document.getElementById('violin_book_4');
        elem.parentNode.removeChild(elem);
    }
    if (violinBook5 != null && violinBook5 != "") {
        document.getElementById("qty_violin_book_5").value = violinBook5;
    } else {
        var elem = document.getElementById('violin_book_5');
        elem.parentNode.removeChild(elem);
    }
    if (balancePoint != null && balancePoint != "") {
        document.getElementById("qty_balance_point").value = balancePoint;
    } else {
        var elem = document.getElementById('balance_point');
        elem.parentNode.removeChild(elem);
    }
    if (openHeart != null && openHeart != "") {
        document.getElementById("qty_open_heart").value = openHeart;
    } else {
        var elem = document.getElementById('open_heart');
        elem.parentNode.removeChild(elem);
    }
    if (celloBook1 != null && celloBook1 != "") {
        document.getElementById("qty_cello_book_1").value = celloBook1;
    } else {
        var elem = document.getElementById('cello_book_1');
        elem.parentNode.removeChild(elem);
    }
    if (celloBook3 != null && celloBook3 != "") {
        document.getElementById("qty_cello_book_3").value = celloBook3;
    } else {
        var elem = document.getElementById('cello_book_3');
        elem.parentNode.removeChild(elem);
    }
    if (observer1 != null && observer1 != "") {
        document.getElementById("qty_observer_1").value = observer1;
    } else {
        var elem = document.getElementById('observer_1');
        elem.parentNode.removeChild(elem);
    }
    if (observer2 != null && observer2 != "") {
        document.getElementById("qty_observer_2").value = observer2;
    } else {
        var elem = document.getElementById('observer_2');
        elem.parentNode.removeChild(elem);
    }

    document.forms['payform'].submit();
} 
