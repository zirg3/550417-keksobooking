'use strict';
(function () {
  var ESC_KEY = 27;
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');

  //  Выключает формы
  var formElements = document.querySelectorAll('fieldset');
  var disabledForm = function () {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = true;
    }
  };
  disabledForm();

  //  Активация карты
  var mainForm = document.querySelector('.ad-form');

  var activatedMap = function () {
    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = false;
    }
  };

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

    dataArray.forEach(function (ElemetOfArray) {
      if (ElemetOfArray.offer) {
        var newPin = window.createPin(ElemetOfArray, function () {
          closeOpenedPopup();
          var card = window.renderCard(ElemetOfArray);
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

  window.map = {
    activatedMap: activatedMap,
    renderPins: renderPins
  };
})();
