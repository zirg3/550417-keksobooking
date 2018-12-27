'use strict';
(function () {

  var ENTER__KEY = 13;
  var ESC__KEY = 27;
  var appartments = window.data.appartments;
  var renderCard = window.card.renderCard;
  var renderPins = window.pin.renderPins;
  var pin = window.pin.pin;

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
  var address = document.querySelector('#address');

  //  Активация карты
  var activatedMap = function () {
    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = false;
    }
    pin.appendChild(renderPins(appartments));
    addPinsHandler();
  };

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

  window.map = {
    address: address,
    mainPin: mainPin,
    activatedMap: activatedMap
  };
})();
