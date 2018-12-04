'use strict';

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
var ROOM_MIN = 1;
var ROOM_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var APPARTMENTS_QUANTITY = 8;
var minCoordinateX = 1;
var maxCoordinateX = 1200;
var minCoordinateY = 130;
var maxCoordinateY = 630;

//  убираю класс map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

//  Перемешивает массив с изоображениями
var getMixArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

//  Случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var getRandomArray = function (array) {
  var randomArray = Math.floor(Math.random() * array.length);
  return array[randomArray];
};

//  создаю массив
var appartments = [];

var createAppartments = function (appartmentsQuantity) {
  for (var i = 0; i < appartmentsQuantity; i++) {
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
};

createAppartments(APPARTMENTS_QUANTITY);

//  Создаю метки
var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (appartment) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = appartment.location.x + 'px';
  pinElement.style.top = appartment.location.y + 'px';
  pinElement.querySelector('img').src = appartment.author;
  pinElement.querySelector('img').alt = appartment.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < appartments.length; k++) {
  fragment.appendChild(renderPin(appartments[k]));
}

similarListElement.appendChild(fragment);

var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

//  пишу функцию для генерации карточки
var renderCard = function (appartment) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = appartment.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = appartment.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = appartment.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = APPARTMENT_TYPES[appartment.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = appartment.offer.rooms + ' комнаты для ' + appartment.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + appartment.offer.checkin + ',' + ' выезд до ' + appartment.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = appartment.offer.description;
  cardElement.querySelector('.popup__features').innerHTML = '';
  for (var j = 0; j < appartment.offer.features.length; j++) {
    var elementL = document.createElement('li');
    elementL.className = 'popup__feature popup__feature--' + appartment.offer.features[j];
    cardElement.querySelector('.popup__features').appendChild(elementL);
  }

  cardElement.querySelector('.popup__photos').innerHTML = '';
  var photosList = cardElement.querySelector('.popup__photos');
  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < appartment.offer.photos.length; i++) {
    var elementI = document.createElement('img');
    elementI.className = 'popup__photo';
    elementI.src = appartment.offer.photos[i];
    elementI.width = 45;
    elementI.height = 40;
    photosFragment.appendChild(elementI);
  }
  photosList.appendChild(photosFragment);

  return cardElement;
};

var promoCard = renderCard(appartments[0]);

var filter = document.querySelector('.map__filters-container');

map.insertBefore(promoCard, filter);
