(function() {

  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
  }

  var addClass = function addClass(el, className) {
    return el.className += " " + className;
  }

  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className)
    } else if (hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
      el.className = el.className.replace(reg, ' ')
    }
  }

  var slideShow = function slideShow() {
    var previousArrow = document.getElementById('previous-arrow');
    var nextArrow = document.getElementById('next-arrow');
    var mainDiv = document.getElementById('main-div');
    var photoDiv = document.getElementById('photo-div');
    var myImage = document.getElementById('my-image');
    var observer = lozad(); // lazy loads elements with default selector as ".lozad"
    var slideNumber = 0;
    var slides = [
      '63490001.JPG',
      '63490002.JPG',
      '63490005.JPG',
      '63490006.JPG',
      '63490007.JPG',
      '63490008.JPG',
      '63490009.JPG',
      '63490010.JPG',
      '63490011.JPG',
      '63490012.JPG',
      '63490013.JPG',
      '63490014.JPG',
      '63490015.JPG',
      '63490016.JPG',
      '63490017.JPG',
      '63490019.JPG',
      '63490020.JPG',
      '63490021.JPG',
      '63490022.JPG',
      '63490023.JPG',
      '63490024.JPG',
      '63490025.JPG',
      '63490026.JPG',
    ];

    var changeImageSize = function changeImageSize(image) {
      var browserWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

      if (browserWidth > 1000) {
        image.addEventListener('load', function() {
          if (this.naturalWidth === 2048 && this.naturalHeight === 3088) {
            this.style = 'max-width: 35%';
          } else {
            this.style = 'max-width: 75%';
          }
        });
      }
    }

    var toggleItems = function toggleItems() {
      var title = document.getElementById('title');

      if (slideNumber <= 0) {
        previousArrow.style = 'opacity: 0; pointer-events: none;';
        removeClass(title, 'animated');
        addClass(title, 'animated');
        removeClass(title, 'fadeOut');
        addClass(title, 'fadeIn');
        myImage.src = './assets/63490004.JPG';
      } else {
        previousArrow.style = 'opacity: 1; pointer-events: auto;';
        removeClass(title, 'animated');
        addClass(title, 'animated');
        removeClass(title, 'fadeIn');
        addClass(title, 'fadeOut');
        observer.observe();
        myImage.src = './assets/' + slides[slideNumber];
        changeImageSize(myImage);
      }
    }

    var handlePreviousArrow = function handlePreviousArrow() {
      slideNumber -= 1;
      toggleItems();
    }

    var handleNextArrow = function handleNextArrow() {
      slideNumber += 1;
      if (slideNumber === 23) {
        slideNumber = 0;
      }
      toggleItems();
    }

    previousArrow.onclick = handlePreviousArrow;
    nextArrow.onclick = handleNextArrow;
  }

  slideShow();
}());
