delete document.scripts;
var elt = document.createElement("script");
elt.innerHTML = "delete window.google;delete window.rwt;console.log('hello world')"
document.body.appendChild(elt);

var scrp = document.getElementsByTagName('script');

for (var i = 0,l = scrp.length; i < l; ++i) {
    scrp[0].remove();
}

//window.setInterval(function () {
//    if(window.google) {
//        delete window.google;
//        rwt = undefined
//        console.log('delete window.google');
//    }
//}, 1000)
