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
var ENTER__KEY = 13;
var ESC__KEY = 27;
var MAP_WIDTH = 1150;
var MAP_HEIGHT = 750;
var minCoordinateX = 1;
var maxCoordinateX = 1200;
var minCoordinateY = 130;
var maxCoordinateY = 630;

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
};

var getRandomArray = function (array) {
  var randomArray = Math.floor(Math.random() * array.length);
  return array[randomArray];
};

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

//  Создаю метки
var pin = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (appartment, index) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = appartment.location.x + 'px';
  pinElement.style.top = appartment.location.y + 'px';
  pinElement.querySelector('img').src = appartment.author;
  pinElement.querySelector('img').alt = appartment.offer.title;
  pinElement.setAttribute('data-id', index);
  return pinElement;
};

var renderPins = function (appart) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < appart.length; i++) {
    fragment.appendChild(renderPin(appart[i], i));
  }
  return fragment;
};

var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renderFeatures = function (appartment) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < appartment.length; i++) {
    var element = document.createElement('li');
    element.className = 'popup__feature popup__feature--' + appartment[i];
    fragment.appendChild(element);
  }
  return fragment;
};

var renderPhoto = function (appartment) {
  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < appartment.length; i++) {
    var image = document.createElement('img');
    image.className = 'popup__photo';
    image.src = appartment[i];
    image.width = 45;
    image.height = 40;
    photosFragment.appendChild(image);
  }
  return photosFragment;
};

//  пишу функцию для генерации карточки
var renderCard = function (appartment) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = appartment.author;
  cardElement.querySelector('.popup__title').textContent = appartment.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = appartment.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = appartment.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = APPARTMENT_TYPES[appartment.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = appartment.offer.rooms + ' комнаты для ' + appartment.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + appartment.offer.checkin + ',' + ' выезд до ' + appartment.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = appartment.offer.description;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(renderFeatures(appartment.offer.features));
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(renderPhoto(appartment.offer.photos));

  return cardElement;
};

// ------------------------------------------------------
var map = document.querySelector('.map');

//  Выключает формы
var formElements = document.querySelectorAll('fieldset');
var disabledForm = function () {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = true;
  }
};
disabledForm();

var mainPin = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.ad-form');

//  Координаты
var setAddressCoords = function (left, top) {
  var inputAdress = document.querySelector('#address');
  inputAdress.value = left + ', ' + top;
};

//  Активация карты
var activatedMap = function () {
  map.classList.remove('map--faded');
  mainForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = false;
  }
  pin.appendChild(renderPins(appartments));
  setAddressCoords(MAP_WIDTH / 2, MAP_HEIGHT / 2);
  addPinsHandler();
};

// Пин в отпуске
mainPin.addEventListener('mouseup', function () {
  activatedMap();
});

// Информация о иных
var closeCard = function () {
  var mapCard = document.querySelector('.map__card');
  map.removeChild(mapCard);
};

var openPopup = function (data) {
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    closeCard();
  }
  map.insertBefore(renderCard(data), map.querySelector('popup'));
};

// Клик закрытие
var closePopupBtn = function () {
  var popupClose = document.querySelector('.popup__close');
  popupClose.addEventListener('click', function () {
    closeCard();
  });
};

var addPinsHandler = function () {
  var pins = pin.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener('click', function (evt) {
      var button = evt.currentTarget;
      var pinId = button.getAttribute('data-id');
      openPopup(appartments[pinId]);
      closePopupBtn();
    });
  }
};

//  Активация и закрытие по клавишам
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER__KEY) {
    addPinsHandler();
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC__KEY) {
    closeCard();
  }
});

// Тип - плата-------------------------------------------------------------------------------
var inputPrice = document.querySelector('#price');
var typeHous = document.querySelector('#type');

var typePrice = {
  'bungalo': {
    min: '0',
    placeholder: '0'
  },
  'flat': {
    min: '1000',
    placeholder: '1000'
  },
  'house': {
    min: '5000',
    placeholder: '5000'
  },
  'palace': {
    min: '10000',
    placeholder: '10000'
  }
};

var synchPrice = function () {
  switch (typeHous.value) {
    case 'bungalo':
      inputPrice.min = typePrice.bungalo.min;
      inputPrice.placeholder = typePrice.bungalo.placeholder;
      return;
    case 'flat':
      inputPrice.min = typePrice.flat.min;
      inputPrice.placeholder = typePrice.flat.placeholder;
      return;
    case 'house':
      inputPrice.min = typePrice.house.min;
      inputPrice.placeholder = typePrice.house.placeholder;
      return;
    case 'palace':
      inputPrice.min = typePrice.palace.min;
      inputPrice.placeholder = typePrice.palace.placeholder;
      return;
  }
};

typeHous.addEventListener('input', synchPrice);

// Комнаты-места
var inputCapacity = document.querySelector('#capacity');
var inputRoomNumber = document.querySelector('#room_number');
var capacityOptions = inputCapacity.querySelectorAll('option');
var roomNumberOptions = inputRoomNumber.querySelectorAll('option');

var synch = function () {
  for (var i = 0; i < capacityOptions.length; i++) {
    capacityOptions[i].disabled = false;
  }
};

var roomsAndPlaces = function () {
  synch();
  for (var i = 0; i < roomNumberOptions.length; i++) {
    if (roomNumberOptions[i].selected === true) {
      switch (roomNumberOptions[i].value) {
        case '1':
          capacityOptions[0].disabled = true;
          capacityOptions[1].disabled = true;
          capacityOptions[2].selected = true;
          capacityOptions[3].disabled = true;
          break;
        case '2':
          capacityOptions[0].disabled = true;
          capacityOptions[1].selected = true;
          capacityOptions[3].disabled = true;
          break;
        case '3':
          capacityOptions[0].selected = true;
          capacityOptions[3].disabled = true;
          break;
        case '100':
          capacityOptions[0].disabled = true;
          capacityOptions[1].disabled = true;
          capacityOptions[2].disabled = true;
          capacityOptions[3].selected = true;
          break;
      }
    }
  }
};
roomsAndPlaces();

inputRoomNumber.addEventListener('change', roomsAndPlaces);

// Время заезда и выезда
var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');

timein.addEventListener('change', function (evt) {
  timeout.value = evt.target.value;
});

timeout.addEventListener('change', function (evt) {
  timein.value = evt.target.value;
});
