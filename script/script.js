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

});