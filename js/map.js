'use strict';


var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var TYPES = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

function getRandom(numFrom, numTo) {

  return Math.floor( Math.random()*(numTo-numFrom+1) ) + numFrom;

}

function getAvatar(i) {

  if ( (i >= 0) && (i < 10) ) {
    return 'img/avatars/user0' + (i+1) + '.png';
  }
  else {
    return '';
  }

}

function getTimeString(hours) {

  return (hours<10 ? '0' : '') + hours + ':00';

}

function getFeatures( features ) {

  var results = [];

  for(var i=0; i < features.length; i++) {
    if (getRandom(0,1) == 1) {
      results.push(features[i]);
    }
  }

  return results;

}


var getSimilarNotices = function() {

  var results = [];
  var notice = {};

  for(var i=0; i < 8; i++) {
    var location = {
      'x': getRandom(300, 900),
      'y': getRandom(250, 700)
    }

    results[i] = {
      'avatar':  getAvatar(i),
      'offer':  {
        'title':  TITLES[i],
        'address':  '\"' + location.x + ',' + location.y + '\"',
        'price': getRandom(1000, 1000000),
        'type': Object.keys(TYPES)[getRandom(0,2)],
        'rooms': getRandom(1,5),
        'guests': getRandom(1,15),
        'checkin': getTimeString(getRandom(12,14)),
        'checkout': getTimeString(getRandom(12,14)),
        'features': getFeatures(FEATURES),
        'description': '',
        'photos': []
                },
      'location': location
    }

  }

  return results;

};


function renderMapPin( notice) {

  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var pinH = parseInt(window.getComputedStyle(pinTemplate).getPropertyValue('height'))
           + parseInt(window.getComputedStyle(pinTemplate,':after').getPropertyValue('border-top-width'));
  var pinW = parseInt(window.getComputedStyle(pinTemplate).getPropertyValue('width'));

  var pinX = notice.location.x - pinW/2;
  var pinY = notice.location.y - pinH;

  var elem = pinTemplate.cloneNode(true);

  elem.style.left = pinX + 'px';
  elem.style.top = pinY + 'px';
  elem.querySelector('img').src = notice.avatar;

  return elem;

}

function setMapPins( notices ) {

  var frag = document.createDocumentFragment();

  for(var i=0; i < notices.length; i++) {
    frag.appendChild( renderMapPin( notices[i] ) );
  }

  mapPins.appendChild(frag);

};

function insertFirstNotice( notices ) {

  var noticeTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var elem = noticeTemplate.cloneNode(true);
  var n = 0;

  elem.querySelector('h3').textContent = notices[n].offer.title;
  elem.querySelector('p:first-of-type small').textContent = notices[n].offer.address;
  elem.querySelector('.popup__price').textContent = notices[n].offer.price + '\u20bd;' + '/ночь';
  elem.querySelector('h4').textContent = TYPES[notices[n].offer.type];
  elem.querySelector('h4 + p').textContent = notices[n].offer.rooms + ' комнат для ' + notices[n].offer.guests +
  ' гостей';
  elem.querySelector('h4 + p + p').textContent = 'Заезд после ' +  notices[n].offer.checkin +
  ' выезд до ' + notices[n].offer.checkout;

  var elemLi = elem.querySelector('ul li').cloneNode(true);
  elemLi.classList = '';
  elem.querySelector('ul').innerHTML = '';

  for(var i=0; i < notices[n].offer.features.length; i++) {
    var e = elemLi.cloneNode(true);
    e.classList.add('feature');
    e.classList.add('feature--' + notices[n].offer.features[i]);
    elem.querySelector('ul').appendChild(e);
  }

  elem.querySelector('ul + p').textContent = notices[n].offer.description;
  elem.querySelector('.popup__avatar').src = notices[n].avatar;

  map.appendChild(elem);

}


map.classList.remove('map--faded');
var notices = getSimilarNotices();
setMapPins(notices);
insertFirstNotice(notices);



