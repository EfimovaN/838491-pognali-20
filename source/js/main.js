    var navMain = document.querySelector('.main-nav');
    var navToggle = document.querySelector('.main-nav__toggle');
    var pageHeader = document.querySelector('.page-header');
    var logoWhite = document.querySelector('.logo__image.logo__white');
    var logoBlue = document.querySelector('.logo__image.logo__blue');

    navMain.classList.remove('main-nav--nojs');

    navToggle.addEventListener('click', function() {
      if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
        pageHeader.classList.remove('page-header--closed');
        pageHeader.classList.add('page-header--opened');
        logoWhite.classList.add('logo__image--hidden');
        logoBlue.classList.remove('logo__image--hidden');
      } else {
        navMain.classList.remove('main-nav--opened');
        navMain.classList.add('main-nav--closed');
        pageHeader.classList.remove('page-header--opened');
        pageHeader.classList.add('page-header--closed');
        logoWhite.classList.remove('logo__image--hidden');
        logoBlue.classList.add('logo__image--hidden');
      }
    });
