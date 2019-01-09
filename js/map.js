'use strict';
(function () {
  var ESC_KEY = 27;
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');

  // Клик закрытие
  var closePopupBtn = function () {
    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      closeOpenedPopup();
    });
  };

  // Удаление
  var closeOpenedPopup = function () {
    var oldCard = map.querySelector('.map__card');
    if (oldCard) {
      oldCard.remove();
    }
  };

  var showCard = function (cardElement) {
    map.insertBefore(cardElement, map.querySelector('.map__filters-container'));
    closePopupBtn();
  };

  // Рендер меток
  var renderPins = function (dataArray) {
    var fragment = document.createDocumentFragment();

    dataArray.forEach(function (elementOfArray) {
      if (elementOfArray.offer) {
        var newPin = window.createPin(elementOfArray, function () {
          closeOpenedPopup();
          var card = window.renderCard(elementOfArray);
          showCard(card);
        });
      }
      fragment.appendChild(newPin);
    });
    pins.appendChild(fragment);
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEY) {
      closeOpenedPopup();
    }
  });

  var removePins = function () {
    var ordinaryPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    ordinaryPins.forEach(function (item) {
      pins.removeChild(item);
    });
  };

  window.map = {
    closeOpenedPopup: closeOpenedPopup,
    removePins: removePins,
    renderPins: renderPins
  };
})();
