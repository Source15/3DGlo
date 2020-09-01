'use strict';

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
});