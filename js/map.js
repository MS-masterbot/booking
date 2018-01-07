'use strict';


var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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


function generateSimilarNotices() {

  var results = [];
  var notice = {};

  for(var i=0; i < 8; i++) {
    results[i] = {
      'avatar':  getAvatar(i),
      'offer':  { 'title' :TITLES[i]
                },
      'address':  { 'x': getRandom(300, 900),
                    'y': getRandom(100, 500)
                  },
      'price': getRandom(1000, 1000000),
      'type': TYPES[getRandom(0,2)],
      'rooms': getRandom(1,5),
      'guests': getRandom(1,15),
      'checkin': getTimeString(getRandom(12,14)),
      'checkout': getTimeString(getRandom(12,14)),
      'features': FEATURES.slice(getRandom(-6,6)),
      'description': '',
      'photos': []

    }

  }

  console.log(results);

};

generateSimilarNotices();


function Test() {
  var tests = Array(20);
  tests.fill(0);
  var n;

  for(var i=0; i < 50000; i++) {
    n = getRandom(8,13);
    tests[n]++;
  }

  console.log(tests);
}

Test();


