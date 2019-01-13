'use strict';

(function () {
  var MAX_UPLOADED_IMAGES = 10;
  var MAX_AVATAR = 1;
  var fileTypes = ['jpg', 'jpeg', 'png'];

  window.upload = {};
  window.upload.uploadContainer = document.querySelector('.ad-form__photo-container');

  var loadImages = function (file, maxImages, targetBlock, targetImage) {
    var fileName = file.name.toLowerCase();
    var matches = fileTypes.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (maxImages === MAX_AVATAR && targetImage) {
          targetImage.src = reader.result;
        }
        if (maxImages > 1) {
          var numberOfImages = document.querySelectorAll('.ad-form__photo').length;
          if (numberOfImages < maxImages) {
            if (!targetBlock.querySelector('img')) {
              var adPhoto = document.createElement('img');
              adPhoto.alt = 'Фото объявления';
              adPhoto.src = reader.result;
              adPhoto.width = 80;
              adPhoto.height = 80;
              adPhoto.classList.add('ad-form__photo-img');
              targetBlock.appendChild(adPhoto);
              return;
            }
            if (targetBlock.querySelector('img')) {
              var imageBlock = targetBlock.cloneNode(true);
              var image = imageBlock.querySelector('img');
              image.src = reader.result;
              window.upload.uploadContainer.appendChild(imageBlock);
            }
          }
          if (numberOfImages === maxImages && !window.upload.uploadContainer.querySelector('p')) {
            var message = document.createElement('p');
            message.textContent = 'Вы можете загрузить не более 10 фото.';
            message.style.color = 'red';
            window.upload.uploadContainer.appendChild(message);
          }
        }
      });
      reader.readAsDataURL(file);
    }
  };

  var imageLoadHandler = function (maxImages, loader, targetBlock, evt, targetImage) {
    if (loader.files) {
      var file = loader.files[0];
      loadImages(file, maxImages, targetBlock, targetImage);
    } else
    if (evt.dataTransfer.files) {
      var droppedFile = evt.dataTransfer.files[0];
      loadImages(droppedFile, maxImages, targetBlock, targetImage);
    }
  };

  var preventDefaultActions = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };

  var avatarUploader = document.querySelector('.ad-form-header__input');
  window.upload.avatar = document.querySelector('.ad-form-header__preview img');

  avatarUploader.addEventListener('input', function (evt) {
    imageLoadHandler(MAX_AVATAR, avatarUploader, false, evt, window.upload.avatar);
  });

  var adImagesUploader = document.querySelector('.ad-form__input');
  window.upload.adImagesBlock = document.querySelector('.ad-form__photo');

  adImagesUploader.addEventListener('input', function (evt) {
    imageLoadHandler(MAX_UPLOADED_IMAGES, adImagesUploader, window.upload.adImagesBlock, evt);
  });

  var imagesDropBlock = document.querySelector('.ad-form__drop-zone');

  imagesDropBlock.addEventListener('dragover', function (evt) {
    preventDefaultActions(evt);
  });
  imagesDropBlock.addEventListener('drop', function (evt) {
    preventDefaultActions(evt);
    imageLoadHandler(MAX_UPLOADED_IMAGES, imagesDropBlock, window.upload.adImagesBlock, evt);
  });

  var avatarDropBlock = document.querySelector('.ad-form-header__drop-zone');

  avatarDropBlock.addEventListener('dragover', function (evt) {
    preventDefaultActions(evt);
  });

  avatarDropBlock.addEventListener('drop', function (evt) {
    preventDefaultActions(evt);
    imageLoadHandler(MAX_AVATAR, avatarDropBlock, false, evt, window.upload.avatar);
  });

})();
