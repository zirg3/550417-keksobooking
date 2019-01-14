'use strict';
(function () {
  var ESC_KEY = 27;
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');
  var PINS_COUNT = 5;

  // Клик закрытие
  var closePopupBtn = function () {
    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      closeOpenedPopup();
    });
  };

  // Удаление
  var closeOpenedPopup = function () {
    var popup = document.querySelector('.map__card');
    if (!popup) {
      return;
    }
    map.removeChild(popup);
    document.removeEventListener('keydown', mapCardEscHandler);
  };

  var showCard = function (cardElement) {
    map.insertBefore(cardElement, map.querySelector('.map__filters-container'));
    closePopupBtn();
  };

  // Рендер меток
  var renderPins = function (dataArray) {
    var fragment = document.createDocumentFragment();
    var slicedArray = dataArray.slice(0, PINS_COUNT);
    slicedArray.forEach(function (elementOfArray) {
      if (elementOfArray.offer) {
        var newPin = window.createPin(elementOfArray, function () {
          closeOpenedPopup();
          var card = window.renderCard(elementOfArray);
          showCard(card);
        });
        fragment.appendChild(newPin);
      }
    });
    pins.appendChild(fragment);
    window.drag.toggleDisableAndEnableFilter();
  };

  var isEscKeycode = function (evt, action) {
    if (evt.keyCode === ESC_KEY) {
      action();
    }
  };

  var mapCardEscHandler = function (evt) {
    isEscKeycode(evt, closeOpenedPopup);
  };

  var removePins = function () {
    var ordinaryPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    ordinaryPins.forEach(function (item) {
      pins.removeChild(item);
    });
  };

  window.map = {
    mapCardEscHandler: mapCardEscHandler,
    closeOpenedPopup: closeOpenedPopup,
    removePins: removePins,
    renderPins: renderPins
  };
})();
