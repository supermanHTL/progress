var myHTML = document.querySelector("html"),
    myWidth = myHTML.clientWidth;

myHTML.style.fontSize = 3 * myWidth / 80 + 'px';

window.onresize = function() {
    var myHTML = document.querySelector("html"),
        myWidth = myHTML.clientWidth;
    myHTML.style.fontSize = 3 * myWidth / 80 + 'px';
};
