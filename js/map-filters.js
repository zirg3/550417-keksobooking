'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuests = filtersForm.querySelector('#housing-guests');
  var housingFeatures = filtersForm.querySelectorAll('.map__checkbox');

  var priceRooms = {
    min: 10000,
    max: 50000
  };

  // изменение типа
  var getChangeType = function (data) {
    if (housingType.value === 'any') {
      return true;
    } else {
      return data.offer.type === housingType.value;
    }
  };

  // изменение цен
  var getFiltredPrice = function (data) {
    var price;
    switch (housingPrice.value) {
      case 'any':
        price = true;
        break;
      case 'low':
        price = data.offer.price < priceRooms.min;
        break;
      case 'middle':
        price = data.offer.price >= priceRooms.min && data.offer.price <= priceRooms.max;
        break;
      case 'high':
        price = data.offer.price >= priceRooms.max;
    }
    return price;
  };

  // изменение колличества комнат
  var getChangeRooms = function (data) {
    if (housingRooms.value === 'any') {
      return true;
    }

    return data.offer.rooms === Number(housingRooms.value);
  };

  // изменение колличества гостей
  var getChangeGuests = function (data) {
    if (housingGuests.value === 'any') {
      return true;
    }

    return data.offer.guests === Number(housingGuests.value);
  };

  // фичи
  var getChangeFeature = function (data) {
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && data.offer.features.indexOf(housingFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var fulterPins = function () {
    var newData = window.data.pins;
    var filteredArray = newData.filter(function (data) {
      return getChangeType(data) && getFiltredPrice(data) && getChangeRooms(data) && getChangeGuests(data) && getChangeFeature(data);
    });

    window.map.removePins();
    window.map.renderPins(filteredArray);
  };

  filtersForm.addEventListener('change', window.map.closeOpenedPopup);
  filtersForm.addEventListener('change', window.utils.debounce(fulterPins));
})();
