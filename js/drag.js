'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

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

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.map.activatedMap();

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

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setsAddressValue();
      window.backend.load(onSuccess, window.utils.onError);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
