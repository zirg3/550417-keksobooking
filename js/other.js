'use strict';
(function () {

  //  Перемешивает массив с изоображениями
  var getMixArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  };

  //  Случайное число
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomArray = function (array) {
    var randomArray = Math.floor(Math.random() * array.length);
    return array[randomArray];
  };

  window.other = {
    getMixArray: getMixArray,
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray
  };
})();
