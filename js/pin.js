'use strict';
(function () {

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Функция, передающая в метку необходимые данные:
  var createPin = function (appartment, pinClickHandler) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = appartment.location.x + 'px';
    pinElement.style.top = appartment.location.y + 'px';
    pinElement.querySelector('img').src = appartment.author.avatar;
    pinElement.querySelector('img').alt = appartment.offer.title;

    pinElement.addEventListener('click', function (evt) {
      pinClickHandler(evt);
    });
    return pinElement;
  };

  window.createPin = createPin;
})();
