'use strict';
(function () {
  var APPARTMENT_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderFeatures = function (appartment) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < appartment.length; i++) {
      var element = document.createElement('li');
      element.className = 'popup__feature popup__feature--' + appartment[i];
      fragment.appendChild(element);
    }
    return fragment;
  };

  var renderPhoto = function (appartment) {
    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < appartment.length; i++) {
      var image = document.createElement('img');
      image.className = 'popup__photo';
      image.src = appartment[i];
      image.width = 45;
      image.height = 40;
      photosFragment.appendChild(image);
    }
    return photosFragment;
  };

  var renderPhotos = function (photos, card) {
    var photosListElement = card.querySelector('.popup__photos');
    if (photos.length !== 0) {
      photosListElement.textContent = '';
      photosListElement.appendChild(renderPhoto(photos));
    } else {
      photosListElement.remove();
    }
  };

  var renderAvatar = function (avatar, card) {
    var avatarElement = card.querySelector('.popup__avatar');
    if (avatar.length !== 0) {
      avatarElement.src = avatar;
    } else {
      avatarElement.remove();
    }
  };

  var renderFeature = function (features, card) {
    var featuresList = card.querySelector('.popup__features');
    if (features.length !== 0) {
      featuresList.textContent = '';
      featuresList.appendChild(renderFeatures(features));
    } else {
      featuresList.remove();
    }
  };

  var renderCard = function (appartment) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = appartment.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = appartment.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = appartment.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = APPARTMENT_TYPES[appartment.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = appartment.offer.rooms + ' комнаты для ' + appartment.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + appartment.offer.checkin + ',' + ' выезд до ' + appartment.offer.checkout;
    renderPhotos(appartment.offer.photos, cardElement);
    renderAvatar(appartment.author.avatar, cardElement);
    renderFeature(appartment.offer.features, cardElement);

    if (!appartment.offer.description.length) {
      cardElement.querySelector('.popup__description').remove();
    } else {
      cardElement.querySelector('.popup__description').textContent = appartment.offer.description;
    }

    return cardElement;
  };

  window.renderCard = renderCard;
})();
