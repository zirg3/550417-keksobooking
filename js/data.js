'use strict';

(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var APPARTMENT_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var FEATURES_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var DESCRIPTIONR = ['Лучшие аппартаменты в центре города'];
  var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var APPARTMENTS_QUANTITY = 8;
  var ROOM_MIN = 1;
  var ROOM_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;
  var minCoordinateX = 1;
  var maxCoordinateX = 1200;
  var minCoordinateY = 130;
  var maxCoordinateY = 630;
  var getMixArray = window.other.getMixArray;
  var getRandomNumber = window.other.getRandomNumber;
  var getRandomArray = window.other.getRandomArray;

  //  создаю массив
  var createAppartments = function (appartmentsCount) {
    var appartments = [];
    for (var i = 0; i < appartmentsCount; i++) {
      var location = {
        'x': getRandomNumber(minCoordinateX, maxCoordinateX),
        'y': getRandomNumber(minCoordinateY, maxCoordinateY)
      };
      var appartment = {
        'author': 'img/avatars/user0' + (i + 1) + '.png',
        'offer': {
          'title': TITLES[i],
          'address': location.x + ', ' + location.y,
          'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
          'type': getRandomArray(OFFER_TYPES),
          'rooms': getRandomNumber(ROOM_MIN, ROOM_MAX),
          'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
          'checkin': getRandomArray(OFFER_CHECKIN),
          'checkout': getRandomArray(OFFER_CHECKOUT),
          'features': FEATURES_TYPES.slice(getRandomNumber(0, 2), getRandomNumber(3, 6)),
          'description': DESCRIPTIONR,
          'photos': getMixArray(PHOTOS)
        },
        'location': {
          'x': location.x,
          'y': location.y
        }
      };
      appartments.push(appartment);
    }
    return appartments;
  };

  var appartments = createAppartments(APPARTMENTS_QUANTITY);

  window.data = {
    appartments: appartments,
    APPARTMENT_TYPES: APPARTMENT_TYPES
  };
})();
