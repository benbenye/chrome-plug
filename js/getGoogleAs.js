var searchs = document.getElementsByClassName('r');

for (var i = 0; i < searchs.length; ++i) {
	searchs[i].childNodes[0].removeAttribute('onmousedown');
}