/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener('DOMContentLoaded', function () {
  //Tabs
  let tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach((item, i) => {
      item.style.display = 'none';
      tabs[i].classList.remove('tabheader__item_active');
    });
  }

  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', function (event) {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); //Modal

  const modal = document.querySelector('.modal'),
        modalOpenButtons = document.querySelectorAll('button[data-modal]'),
        modalToggle = modal => {
    modal.classList.toggle('hide');
    document.body.classList.toggle('overflow_hiden');
  },
        showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      modalToggle(modal);
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !modal.classList.contains('hide')) {
      modalToggle(modal);
    }
  });
  modal.addEventListener('click', event => {
    if (event.target === modal || event.target.getAttribute('data-modalClose') === '') {
      modalToggle(modal);
    }
  });
  modalOpenButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modalToggle(modal);
    });
  }); //Timer

  let deadline = '2022-09-20';

  function setClock(selector, endtimer) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timerInterval = setInterval(updateClock, 1000);
    updateClock();

    function isZero(num) {
      return num < 10 ? num <= 0 ? '00' : `0${num}` : num;
    }

    function updateClock() {
      const total = Date.parse(endtimer) - new Date(),
            date = {
        'days': Math.floor(total / (1000 * 60 * 60 * 24)),
        'hours': Math.floor(total / (1000 * 60 * 60) % 24),
        'minutes': Math.floor(total / (1000 * 60) % 60),
        'seconds': Math.floor(total / 1000 % 60)
      };
      days.innerHTML = isZero(date.days);
      hours.innerHTML = isZero(date.hours);
      minutes.innerHTML = isZero(date.minutes);
      seconds.innerHTML = isZero(date.seconds);

      if (total <= 0) {
        clearInterval(timerInterval);
      }
    }
  }

  setClock('.timer', deadline); // Training with class
  // class MenuCard {
  //     constructor(src, alt, title, descr, price, parentSelector, ...classes) {
  //         this.src = src;
  //         this.alt = alt;
  //         this.title = title;
  //         this.descr = descr;
  //         this.price = price;
  //         this.classes = classes;
  //         this.parent = document.querySelector(parentSelector);
  //     }
  //
  //     render() {
  //         const element = document.createElement('div');
  //
  //         if (this.classes.length === 0) {
  //             this.classes = "menu__item";
  //             element.classList.add(this.classes);
  //         } else {
  //             this.classes.forEach(className => element.classList.add(className));
  //         }
  //
  //         element.innerHTML = `
  //             <img src=${this.src} alt=${this.alt}>
  //             <h3 class="menu__item-subtitle">${this.title}</h3>
  //             <div class="menu__item-descr">${this.descr}</div>
  //             <div class="menu__item-divider"></div>
  //             <div class="menu__item-price">
  //                 <div class="menu__item-cost">Цена:</div>
  //                 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
  //             </div>
  //         `;
  //         this.parent.append(element);
  //     }
  // }
  //
  // getResource('http://localhost:3000/menu')
  //     .then(data => {
  //         data.forEach(({img, altimg, title, descr, price}) => {
  //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
  //         });
  //     });
  //Send data to server

  const forms = document.querySelectorAll('form'),
        message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так'
  };
  forms.forEach(item => {
    bindSendData(item);
  });

  const sendData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
    return await res.json();
  }; // async function getResource(url) {
  //     let res = await fetch(url);
  //
  //     if (!res.ok) {
  //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  //     }
  //
  //     return await res.json();
  // }


  function bindSendData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('div');
      statusMessage.textContent = message.loading;
      statusMessage.style.cssText = `
                margin-top: 10px;
                text-align: center;
            `;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      sendData('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        showInfoModal(message.success);
      }).catch(() => {
        showInfoModal(message.failure);
      }).finally(() => {
        form.reset();
        statusMessage.remove();
      });
    });
  }

  function showInfoModal(message) {
    const OriginalModalDialog = document.querySelector('.modal__dialog');
    OriginalModalDialog.classList.add('hide');
    modal.classList.remove('hide');
    document.body.classList.add('overflow_hiden');
    const infoModal = document.createElement('div');
    infoModal.classList.add('modal__dialog');
    infoModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-modalclose="">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    modal.append(infoModal);
    setTimeout(() => {
      infoModal.remove();
      OriginalModalDialog.classList.remove('hide');
      modal.classList.add('hide');
      document.body.classList.remove('overflow_hiden');
    }, 4000);
  } // Slider


  window.addEventListener('load', () => {
    let offset = 0,
        slideIndex = 1;

    const slider = document.querySelector('.offer__slider'),
          slides = document.querySelectorAll('.offer__slide'),
          prevSlide = document.querySelector('.offer__slider-prev'),
          nextSlide = document.querySelector('.offer__slider-next'),
          currentSlide = document.querySelector('#current'),
          totalSlides = document.querySelector('#total'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          width = Math.round(+window.getComputedStyle(slidesWrapper).width.slice(0, -2)),
          endWidth = width * (slides.length - 1),
          slidesField = document.querySelector('.offer__slider-inner'),
          checkIndex = function () {
      let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return i < 10 ? `0${i}` : i;
    },
          selectDot = (dotsArr, index) => {
      dotsArr.forEach((dot, i) => {
        i === index ? dot.style.opacity = '1' : dot.style.opacity = '.5';
      });
    };

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    totalSlides.textContent = checkIndex(slides.length);
    currentSlide.textContent = checkIndex(slideIndex);
    slides.forEach(slide => {
      console.log(width);
      slide.style.width = `${width}`;
    });
    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      dot.setAttribute('data-slide-to', `${i + 1}`);

      if (i === slideIndex - 1) {
        dot.style.opacity = '1';
      }

      indicators.append(dot);
      dots.push(dot);
    }

    nextSlide.addEventListener('click', () => {
      if (offset >= endWidth) {
        offset = 0;
        slideIndex = 1;
      } else {
        offset += width;
        slideIndex++;
      }

      selectDot(dots, slideIndex - 1);
      currentSlide.textContent = checkIndex(slideIndex);
      slidesField.style.transform = `translateX(-${offset}px)`;
    });
    prevSlide.addEventListener('click', () => {
      if (offset <= 0) {
        offset = endWidth;
        slideIndex = slides.length;
      } else {
        offset -= width;
        slideIndex--;
      }

      selectDot(dots, slideIndex - 1);
      currentSlide.textContent = checkIndex(slideIndex);
      slidesField.style.transform = `translateX(-${offset}px)`;
    });
    dots.forEach(dot => {
      dot.addEventListener('click', event => {
        slideIndex = event.target.getAttribute('data-slide-to');
        selectDot(dots, slideIndex - 1);
        currentSlide.textContent = checkIndex(slideIndex);
        offset = width * (slideIndex - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
      });
    });
  }); // Simpler solution
  // totalSlides.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;
  //
  // showCurrentSlide();
  // function showCurrentSlide(i = 0){
  //     currentSlide.textContent = i+1 < 10 ? `0${i+1}` : i+1;
  //     slides.forEach((slide, iter) => {
  //         iter === i ? slide.classList.remove('hide') : slide.classList.add('hide');
  //     })
  // }
  //
  // nextSlide.addEventListener('click', () => {
  //     showCurrentSlide(+currentSlide.textContent + 1 > slides.length  ? 0 : +currentSlide.textContent)
  // });
  //
  // prevSlide.addEventListener('click', () => {
  //     showCurrentSlide(+currentSlide.textContent - 2 < 0  ? slides.length - 1 : +currentSlide.textContent - 2)
  // })
  //calculator

  let sex = 'female',
      height,
      weight,
      age,
      ratio = 1.375;
  const result = document.querySelector('.calculating__result');

  function calcCalorie(sex, height, weight, age, ratio) {
    result.textContent = '';
    const span = document.createElement('span');
    span.style.fontSize = '42px';
    span.textContent = 'Введите все данные';

    if (sex && height && weight && age && ratio) {
      if (sex === 'female') {
        span.textContent = `${Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio)}`;
      }

      if (sex === 'male') {
        span.textContent = `${Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio)}`;
      }

      result.append(span);
      result.insertAdjacentText('beforeend', 'ккал');
    } else {
      span.style.fontSize = '22px';
      result.append(span);
    }
  }

  function getStaticInfo(parentElement, buttonClass, classActive) {
    parentElement.addEventListener('click', event => {
      const target = event.target;

      if (target.classList.contains(buttonClass) && target.tagName !== 'INPUT') {
        if (target.getAttribute('data-ratio')) {
          ratio = target.getAttribute('data-ratio');
          parentElement.querySelectorAll('[data-ratio]').forEach(element => {
            element.classList.remove(classActive);
          });
        } else {
          sex = target.getAttribute('id');
          parentElement.querySelectorAll('[data-sexToggle]').forEach(element => {
            element.classList.remove(classActive);
          });
        }

        target.classList.add(classActive);
        calcCalorie(sex, height, weight, age, ratio);
      }
    });
  }

  function getDynamicInfo(id) {
    const input = document.querySelector(id);
    input.addEventListener('input', () => {
      const inputValue = +input.value.trim();

      if (!isNaN(inputValue)) {
        switch (input.getAttribute('id')) {
          case "height":
            height = inputValue;
            break;

          case "weight":
            weight = inputValue;
            break;

          case "age":
            age = inputValue;
            break;
        }
      } else {
        input.value = input.value.slice(0, -1);
      }

      calcCalorie(sex, height, weight, age, ratio);
    });
  }

  getStaticInfo(document.querySelector('.calculating__field'), 'calculating__choose-item', 'calculating__choose-item_active');
  calcCalorie();
  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');
});

/***/ })

/******/ });
//# sourceMappingURL=main.js.map