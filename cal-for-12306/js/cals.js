/*
* Copyright (c) 2011 The Chromium Authors. All rights reserved.
* Use of this source code is governed by a BSD-style license that can be
* found in the LICENSE file.
*/

/**
 * Performs an XMLHttpRequest to Twitter's API to get trending topics.
 *
 * @param callback Function If the response from fetching url has a
 *     HTTP status of 200, this function is called with a JSON decoded
 *     response.  Otherwise, this function is called with null.
 */
function fetchTwitterFeed(callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        callback(null);
      }
    }
  }
  // var formDate = (new Date()).toJSON().substring(0,10);
  // var endDate = 0;
  // Note that any URL fetched here must be matched by a permission in
  // the manifest.json file!
  var url = 'https://kyfw.12306.cn/otn/queryOrder/queryMyOrder?queryType=2&queryStartDate=2016-12-01&queryEndDate=2016-12-31&come_from_flag=my_order&pageSize=8&pageIndex=0&query_where=G';
  xhr.open('GET', url, true);
  xhr.send();
};

/**
 * Parses text from Twitter's API and generates a bar with trending topics at
 * the top of the current page
 *
 * @param data Object JSON decoded response.  Null if the request failed.
 */
function onText(data) {
  // Only render the bar if the data is parsed into a format we recognize.
  console.log(data)
  if (data.status && data.data.OrderDTODataList) {
    // Create the overlay at the top of the page and fill it with data.
    var trends_dom = document.createElement('div');
    var title_dom = document.createElement('strong');
    title_dom.innerText = '火车行程：';
    trends_dom.appendChild(title_dom);
    var mm = data.data.OrderDTODataList;


    var bbycal = new BbyCal(mm)
    bbycal.appendCal()


    mm.forEach(function(i){
        let link_dom = document.createElement('div');
        link_dom.innerText =  i.start_train_date_page;
        link_dom.style.color = '#000';
        trends_dom.appendChild(document.createTextNode(' '));
        trends_dom.appendChild(link_dom);
        let start_time = new Date(i.start_train_date_page);
        
        let uls_arr = Array.prototype.slice.call(document.querySelector('.month-'+(start_time.getMonth() +1))
        .children)
        uls_arr.forEach(e=>{
          Array.prototype.slice.call(e.children).forEach(ele=>{
            if(ele.innerText == start_time.getDate()){
              ele.style.backgroundColor = 'red';
              ele.style.color = '#fff';
              ele.innerHTML = '<div>this is the tickets detail information </div>'
            }
          })
        })
    });
    trends_dom.style.cssText = [
      'background-color: #ffd700;',
      'background-image: -webkit-repeating-linear-gradient(' +
          '45deg, transparent, transparent 35px,' +
          'rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 70px);',
      'color: #000;',
      'padding: 10px;',
      'font: 14px Arial;'
    ].join(' ');
    document.body.style.cssText = 'position: relative';
    document.body.parentElement.insertBefore(trends_dom, document.body);

  }
};

fetchTwitterFeed(onText);


function BbyCal(option){
	this.date = new Date();
	this.month = this.date.getMonth()+1;
	this.todaty = this.date.getDate();
	this.year = this.date.getFullYear();
  this.oneWeek = 0;
  this.regMonth31 = /1|3|5|7|8|10|12/;
  this.tickets = option;
}
BbyCal.prototype.appendCal = function() {
  this.makeStyle()
  for(var i = 0; i < 3; ++i){
    var month = (this.month+i) % 12 || 12;
    this.oneWeek = this.getOneDayWeek(month)
    this.makeWeekLiDom(month)
  }
};
BbyCal.prototype.makeWeekLiDom  = function(month) {

	var that = this;
	var _weekLi = '';
  var _weekUl = document.createElement('ul');
  var _dateDiv = document.createElement('div');
  var _start = 1-that.oneWeek;
  var _end = 0;
  _dateDiv.className = 'bby-month month-'+ month
	if(that.regMonth31.test(month)) _end = 31;
  else if(month == 2) _end = that.isLeapYear() && 29 || 28;
  else _end = 30;
 console.log('start:'+_start+';_end:'+_end+';month:'+month)
  for(var i = _start; i <= _end; ++i){
    if(i > 0) {_weekLi =document.createElement('li'); _weekLi.innerText = i;}
    else _weekLi =document.createElement('li');
    _weekUl.appendChild(_weekLi);

    _dateDiv.appendChild(_weekUl)
    if((i-_start)%7 == 6) _weekUl = document.createElement('ul');
  }
  document.body.parentElement.insertBefore(_dateDiv, document.body);
};

BbyCal.prototype.makeStyle = function() {
  var that = this;
  var _style = document.createElement('style');
  var _styleStr = '.bby-month{display:inline-block; margin-right:20px;} .bby-month ul li{display:inline-block; width:30px; border:1px solid #fff; background-color:#ccc;}'
  var _styleTextNode = document.createTextNode(_styleStr);
  _style.appendChild(_styleTextNode);
  document.body.parentElement.insertBefore(_style, document.body);
};

BbyCal.prototype.getOneDayWeek = function(month) {
	var that = this;
  var _date = new Date();
  _date.setDate(1);
  _date.setMonth(month-1);
	return _date.getDay();
};

BbyCal.prototype.isLeapYear = function() {
  if(this.year % 4 == 0) return true;
  else return false;
};