'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var form = document.querySelector('.ad-form');
  var PIN_COORD_X = 570;
  var PIN_COORD_Y = 375;

  // Drag-and-drop
  var MIN_X = 0;
  var MAX_X = 1150;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var onSuccess = function (data) {
    window.data.pins = data;
    window.map.renderPins(data);
  };

  // Координаты
  var setsAddressValue = function () {
    var pinCenterAddress = {
      x: parseInt(mainPin.style.left, 10),
      y: parseInt(mainPin.style.top, 10)
    };

    address.value = pinCenterAddress.x + ', ' + pinCenterAddress.y;
  };

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
  var map = document.querySelector('.map');

  var activatedMap = function () {
    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = false;
    }
  };

  var deactivation = function () {
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    disabledForm();
    window.map.removePins();
    window.map.closeOpenedPopup();
    mainPin.style.left = PIN_COORD_X + 'px';
    mainPin.style.top = PIN_COORD_Y + 'px';
    form.reset();
    window.roomsAndPlaces();
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    activatedMap();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var topY = mainPin.offsetTop - shift.y;
      var leftX = mainPin.offsetLeft - shift.x;

      if (topY < MAX_Y && topY > MIN_Y) {
        mainPin.style.top = topY + 'px';
      }

      if (leftX < MAX_X && leftX > MIN_X) {
        mainPin.style.left = leftX + 'px';
      }
      setsAddressValue();
    };

    var data = window.data.pins;
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setsAddressValue();

      if (data.length === 0) {
        window.backend.load(onSuccess, window.utils.onError);
      } else {
        window.map.renderPins(data);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.drag = {
    deactivation: deactivation
  };
})();
