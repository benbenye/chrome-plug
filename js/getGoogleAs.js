var searchs = document.getElementsByClassName('r');

for (var i = 0; i < searchs.length; ++i) {
	var _href = searchs[i].childNodes[0].getAttribute('href'),
		_text = searchs[i].childNodes[0].innerText,
		_text = document.createTextNode(_text);
console.log(searchs[i].childNodes[0]);
	// searchs[i].childNodes[0].removeAttribute('href');
	searchs[i].childNodes[0].removeAttribute('onmousedown');
	searchs[i].childNodes[0].removeAttribute('onclick');
	searchs[i].childNodes[0].removeAttribute('target');
	searchs[i].childNodes[0].removeAttribute('data-href');
}
