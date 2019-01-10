'use strict';
(function () {
  var form = document.querySelector('.ad-form');
  var formReset = form.querySelector('.ad-form__reset');

  // Тип - плата
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

  var synchRoomsAndPlaces = function () {
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
  synchRoomsAndPlaces();

  inputRoomNumber.addEventListener('change', synchRoomsAndPlaces);

  // Время заезда и выезда
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  timein.addEventListener('change', function (evt) {
    timeout.value = evt.target.value;
  });

  timeout.addEventListener('change', function (evt) {
    timein.value = evt.target.value;
  });

  var onSuccessSubmit = function () {
    window.drag.deactivation();
    var success = document.querySelector('#success').content.querySelector('.success');
    var successElement = success.cloneNode(true);
    document.querySelector('main').appendChild(successElement);
    document.addEventListener('keydown', closeSuccessMessage);
    successElement.addEventListener('click', closeSuccessMessage);
  };

  var closeSuccessMessage = function () {
    var modalSucces = document.querySelector('.success');
    document.querySelector('main').removeChild(modalSucces);
    document.removeEventListener('keydown', closeSuccessMessage);
    modalSucces.removeEventListener('click', closeSuccessMessage);
  };

  form.addEventListener('submit', function (evt) {

    window.backend.save(new FormData(form), onSuccessSubmit, window.utils.onError);
    evt.preventDefault();
  });

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.drag.deactivation();
  });

  window.synchRoomsAndPlaces = synchRoomsAndPlaces;
})();
