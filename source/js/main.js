var currentLocation = window.location;

// Menu

function mainNav() {
  var navMain = document.querySelector('.main-nav');
  var navToggle = document.querySelector('.main-nav__toggle');
  var pageHeader = document.querySelector('.page-header');
  var logoWhite = document.querySelector('.logo__image.logo__white');
  var logoBlue = document.querySelector('.logo__image.logo__blue');

  navMain.classList.remove('main-nav--nojs');
  navMain.classList.remove('main-nav--opened');
  navMain.classList.add('main-nav--closed');
  pageHeader.classList.remove('page-header--opened');
  pageHeader.classList.add('page-header--closed');
  logoWhite.classList.toggle('logo__image--hidden');
  logoBlue.classList.toggle('logo__image--hidden');

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
      pageHeader.classList.remove('page-header--closed');
      pageHeader.classList.add('page-header--opened');
      logoWhite.classList.toggle('logo__image--hidden');
      logoBlue.classList.toggle('logo__image--hidden');
    } else {
      navMain.classList.remove('main-nav--opened');
      navMain.classList.add('main-nav--closed');
      pageHeader.classList.remove('page-header--opened');
      pageHeader.classList.add('page-header--closed');
      logoWhite.classList.toggle('logo__image--hidden');
      logoBlue.classList.toggle('logo__image--hidden');
    }
  });
}



// Modal

function modalTariff() {
  var buisnessTariff = document.querySelector('.buisness-tariff__open');
  var tariffOpen = document.querySelector('.tariff');
  var tariffClose = document.querySelector('.tariff__close');

  buisnessTariff.addEventListener('click', function (evt) {
    evt.preventDefault();
    tariffOpen.classList.add('tariff--opened');
  });

  tariffClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    tariffOpen.classList.remove('tariff--opened');
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (tariffOpen.classList.contains('tariff--opened')) {
        evt.preventDefault();
        tariffOpen.classList.remove('tariff--opened');
      }
    }
  });

}


// Filter country

function filterCountry() {
  var filterCountry = document.querySelector('.filter-country');
  var filterToggle = document.querySelector('.filter-country__toggle');
  var filterUnwrap = document.querySelector('.filter-country__unwrap');

  filterCountry.classList.remove('filter-country--opened');
  filterCountry.classList.add('filter-country--closed');

  filterToggle.addEventListener('click', function() {
    if (filterCountry.classList.contains('filter-country--closed')) {
      filterCountry.classList.remove('filter-country--closed');
      filterCountry.classList.add('filter-country--opened');
    } else {
      filterCountry.classList.remove('filter-country--opened');
      filterCountry.classList.add('filter-country--closed');
    }
  });

  filterUnwrap.addEventListener('click', function() {
    if (filterCountry.classList.contains('filter-country--closed')) {
      filterCountry.classList.remove('filter-country--closed');
      filterCountry.classList.add('filter-country--opened');
    } else {
      filterCountry.classList.remove('filter-country--opened');
      filterCountry.classList.add('filter-country--closed');
    }
  });
}

// Filter travel

function legendToggle() {
  var fieldsetAll = document.querySelectorAll(".main-filter__set");
  var addToggleHandler = function (toggle, fieldset) {
    toggle.addEventListener("click", function () {
      fieldset.classList.toggle("main-filter__set--active");
    });
  };
  for (var i = 0; i < fieldsetAll.length; i++) {
    var fieldset = fieldsetAll[i];
    var toggle = fieldset.querySelector(".main-filter__toggle");
    addToggleHandler(toggle, fieldset);
    fieldset.classList.remove("main-filter__set--active");
  }
}


mainNav();


if (currentLocation.pathname.lastIndexOf("/index.html") >= 0) {
  modalTariff();
}

if (currentLocation.pathname.lastIndexOf("/catalog.html") >= 0) {
  legendToggle();
  filterCountry();
}