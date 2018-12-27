'use strict';
(function () {

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
  window.pin = {
    pin: pin,
    renderPins: renderPins
  };
})();
