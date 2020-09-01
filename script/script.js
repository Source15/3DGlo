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
         menu = document.querySelector('menu'),
         closeBtn = document.querySelector('.close-btn'),
         menuItems = menu.querySelectorAll('ul>li');
      const hendlerMenu = () => {
         menu.classList.toggle('active-menu');
      };
      btnMenu.addEventListener('click', hendlerMenu);
      closeBtn.addEventListener('click', hendlerMenu);
      for (let i = 0; i < menuItems.length; i++) {
         menuItems[i].addEventListener('click', hendlerMenu);
      }

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
});