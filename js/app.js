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
      '003_24a.jpg',
      '004_23a.jpg',
      '009_18a.jpg',
      '020_07a.jpg',
      'kyle.JPG',
      '37960005.JPG',
      '37960009.JPG',
      '37960014.JPG',
      '37960019.JPG',
      '37960020.JPG',
      '37960027.JPG',
      '46530005.JPG',
      '46530008.JPG',
      '46530019.JPG',
      '63490024.JPG',
      '63490026.JPG',
      'weDontExist.JPG',
      'laurenSupreme.JPG',
      'lowLight.JPG',
      'milkyJer.JPG',
      'mask1.JPG',
      'milk.JPG',
      'monument.JPG',
      'mountains.JPG',
      'noPost.JPG',
      '63490020.JPG',
      '63490021.JPG',
      '63490022.JPG',
      '63490023.JPG',
      'bigKahuna.JPG',
      'anarchyBurger.JPG',
      'Earn.JPG',
      'frontside.JPG',
      'earnSmoke.JPG',
      'hammoc.JPG',
    ];

    var changeImageSize = function changeImageSize(image) {
      var browserWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

      if (browserWidth > 1000) {
        image.addEventListener('load', function() {
          if (this.naturalWidth === 2048 && this.naturalHeight === 3088 ||
              this.naturalWidth === 2048 && this.naturalHeight === 3072 ||
              this.naturalWidth === 1992 && this.naturalHeight === 2989 ||
              this.naturalWidth === 2000 && this.naturalHeight === 3000 ||
              this.naturalWidth === 1999 && this.naturalHeight === 3000) {
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
        myImage.src = './assets/63490004.jpg';
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
      if (slideNumber === 51) {
        slideNumber = 0;
      }
      toggleItems();
    }

    previousArrow.onclick = handlePreviousArrow;
    nextArrow.onclick = handleNextArrow;

    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const gestureZone = photoDiv;

    gestureZone.addEventListener('touchstart', function(event) {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
    }, false);

    gestureZone.addEventListener('touchend', function(event) {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      handleGesture();
    }, false);

    function handleGesture() {
      if (touchendX < touchstartX) {
        console.log('Swiped left');
        handlePreviousArrow();
      }

      if (touchendX > touchstartX) {
        console.log('Swiped right');
        handleNextArrow();
      }
    }
  }

  slideShow();
}());
