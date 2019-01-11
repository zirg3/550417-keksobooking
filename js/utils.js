'use strict';
(function () {
  var DEBOUNCE = 500; // ms

  var debounce = function (cb) {
    var lastTimeout;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE);
    };
  };

  var onError = function (message) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorBtn = errorElement.querySelector('.error__button');

    errorMessage.textContent = message;

    document.querySelector('main').insertAdjacentElement('afterbegin', errorElement);
    document.addEventListener('keydown', closeErrorMessage);
    errorElement.addEventListener('click', closeErrorMessage);
    errorBtn.addEventListener('click', closeErrorMessage);
  };

  var closeErrorMessage = function () {
    var modalError = document.querySelector('.error');
    document.querySelector('main').removeChild(modalError);
    document.removeEventListener('keydown', closeErrorMessage);
  };

  window.utils = {
    debounce: debounce,
    onError: onError
  };
})();
