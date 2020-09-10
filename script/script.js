'use strict';
//таймер
window.addEventListener('DOMContentLoaded', () => {

   function countTimer(deadline) {
      const timerHours = document.querySelector('#timer-hours'),
         timerMinute = document.querySelector('#timer-minutes'),
         timerSeconds = document.querySelector('#timer-seconds');

      function getTimeRemainig() {
         const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemainig = (dateStop - dateNow) / 1000,
            sec = Math.floor(timeRemainig % 60),
            minutes = Math.floor((timeRemainig / 60) % 60),
            hours = Math.floor(timeRemainig / 60 / 60);

         return {
            timeRemainig,
            hours,
            minutes,
            sec
         };
      }

      function updateClock() {
         const timer = getTimeRemainig();
         timerHours.textContent = timer.hours >= 10 ? timer.hours : '0' + timer.hours;
         timerMinute.textContent = timer.minutes >= 10 ? timer.minutes : '0' + timer.minutes;
         timerSeconds.textContent = timer.sec >= 10 ? timer.sec : '0' + timer.sec;

         if (timer.timeRemainig <= 0) {
            timerHours.textContent = '00';
            timerMinute.textContent = '00';
            timerSeconds.textContent = '00';
         }

         if (timer.timeRemainig > 0) {
            setInterval(updateClock, 1000);
         }
      }
      updateClock();
   }
   setInterval(countTimer, 1000, '5 September 2020');



   //меню
   const toggleMenu = () => {
      const btnMenu = document.querySelector('.menu'),
         menu = document.querySelector('menu');

      btnMenu.addEventListener('click', (event) => {
         let target = event.target;

         if (target) {
            menu.classList.toggle('active-menu');
         }
      });

      menu.addEventListener('click', (event) => {
         let target = event.target;

         if (target.classList.contains('close-btn')) {
            menu.classList.toggle('active-menu');
         } else {
            let target = event.target.closest('li');

            if (target) {
               menu.classList.toggle('active-menu');
            }
         }
      });
   };
   toggleMenu();

   //popup
   const togglePopup = () => {
      const popup = document.querySelector('.popup'),
         popupBtn = document.querySelectorAll('.popup-btn'),
         popupClose = document.querySelector('.popup-close'),
         popupContent = document.querySelector('.popup-content');

      let interval = 0;
      let height = popupContent.clientHeight;

      const popupAnimation = () => {
         interval++;
         popup.style.display = 'block';
         popupContent.style.top = interval + '%';
         let request = requestAnimationFrame(popupAnimation);
         if (interval >= 30) {
            cancelAnimationFrame(request);
         }
      };

      const closePopup = () => {
         interval = 0;
         popupContent.style.top = -height + 'px';
         popup.style.display = '';
      };

      popupBtn.forEach(item => {
         item.addEventListener('click', () => {
            if (window.innerWidth > 768) {
               popupAnimation();
            } else {
               popup.style.display = 'block';
               popupContent.style.top = '80px';
            }
         });
      });
      popupClose.addEventListener('click', closePopup);

      popup.addEventListener('click', (event) => {
         let addClose = event.target;
         addClose = addClose.closest('.popup-content');
         if (!addClose) closePopup();
      });
   };

   togglePopup();

   //табы

   const tabs = () => {
      const tabHeader = document.querySelector('.service-header'),
         tab = tabHeader.querySelectorAll('.service-header-tab'),
         tabContent = document.querySelectorAll('.service-tab');

      const toggleTabContent = (index) => {
         for (let i = 0; i < tabContent.length; i++) {
            if (index === i) {
               tab[i].classList.add('active');
               tabContent[i].classList.remove('d-none');
            } else {
               tab[i].classList.remove('active');
               tabContent[i].classList.add('d-none');
            }
         }
      };

      tabHeader.addEventListener('click', (event) => {
         let target = event.target;
         target = target.closest('.service-header-tab');
         if (target) {
            tab.forEach((item, i) => {
               if (item === target) {
                  toggleTabContent(i);
               }
            });
         }
      });
   };

   tabs();


   //слайдер

   const slider = () => {
      const slide = document.querySelectorAll('.portfolio-item'),

         ul = document.querySelector('.portfolio-dots'),
         slider = document.querySelector('.portfolio-content');

      let currentSlide = 0,
         interval;

      const addDot = () => {
         for (let i = 0; i < slide.length; i++) {
            const li = document.createElement('li');
            li.classList.add('dot');
            ul.append(li);
            if (i === 0) {
               li.classList.add('dot-active');
            }
         }
      };
      addDot();

      const dot = document.querySelectorAll('.dot');

      const prevSlide = (elem, index, strClass) => {
         elem[index].classList.remove(strClass);
      };

      const nextSlide = (elem, index, strClass) => {
         elem[index].classList.add(strClass);
      };

      const autoPlaySlide = () => {
         prevSlide(slide, currentSlide, 'portfolio-item-active');
         prevSlide(dot, currentSlide, 'dot-active');

         currentSlide++;

         if (currentSlide >= slide.length) {
            currentSlide = 0;
         }
         nextSlide(slide, currentSlide, 'portfolio-item-active');
         nextSlide(dot, currentSlide, 'dot-active');
      };

      const startSlide = (time = 3000) => {
         interval = setInterval(autoPlaySlide, time);
      };

      const stopSlide = () => {
         clearInterval(interval);
      };

      slider.addEventListener('click', (event) => {
         event.preventDefault();

         let target = event.target;

         if (!target.matches('.portfolio-btn, .dot')) {
            return;
         }

         prevSlide(slide, currentSlide, 'portfolio-item-active');
         prevSlide(dot, currentSlide, 'dot-active');

         if (target.matches('#arrow-right')) {
            currentSlide++;
         } else if (target.matches('#arrow-left')) {
            currentSlide--;
         } else if (target.matches('.dot')) {
            dot.forEach((elem, index) => {
               if (elem === target) {
                  currentSlide = index;
               }
            });
         }

         if (currentSlide >= slide.length) {
            currentSlide = 0;
         }

         if (currentSlide < 0) {
            currentSlide = slide.length - 1;
         }

         nextSlide(slide, currentSlide, 'portfolio-item-active');
         nextSlide(dot, currentSlide, 'dot-active');
      });

      slider.addEventListener('mouseover', (event) => {
         if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
            stopSlide();
         }
      });

      slider.addEventListener('mouseout', (event) => {
         if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
            startSlide();
         }
      });

      startSlide(1500);

   };
   slider();
   //наша  команнда
   const replacePhoto = () => {
      const commandPhoto = document.querySelectorAll('.command__photo');
      let photoSrc;

      commandPhoto.forEach(item => {
         item.addEventListener('mouseover', (event) => {
            let target = event.target;
            photoSrc = target.src;
            target.src = target.dataset.img;
         });
         item.addEventListener('mouseout', (event) => {
            let target = event.target;
            target.src = photoSrc;
         });
      });
   };
   replacePhoto();

   //Калькуляторs

   const calculate = (price = 100) => {
      const calcInput = document.querySelectorAll('input[type="text"].calc-item'),
         calcBlock = document.querySelector('.calc-block'),
         calcType = document.querySelector('.calc-type'),
         calcSquare = document.querySelector('.calc-square'),
         calcCount = document.querySelector('.calc-count'),
         calcDay = document.querySelector('.calc-day'),
         totalValue = document.getElementById('total');

      const countSum = () => {
         let total = 0,
            countValue = 1,
            dayValue = 1,
            typeValye = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

         if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
         }

         if (calcDay.value < 5 && calcDay.value) {
            dayValue *= 2;
         } else if (calcDay.value < 10 && calcDay.value) {
            dayValue *= 1.5;
         }

         if (typeValye && squareValue) {
            total = price * typeValye * squareValue * countValue * dayValue;
         }

         totalValue.textContent = total;
      };

      calcBlock.addEventListener('change', (event) => {
         let target = event.target;

         if (target.matches('.calc-type') || target.matches('.calc-square') ||
            target.matches('.calc-day') || target.matches('.calc-count')) {
            countSum();
         }
      });

      calcInput.forEach(item => {
         item.addEventListener('input', () => {
            if (/\D/.test(item.value)) {
               item.value = '';
               item.placeholder = 'Вводите только цифры!';
            }
         });
      });
   };
   calculate();
});