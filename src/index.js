"use strict"
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import replacePhoto from './modules/replacePhoto';
import calculate from './modules/calculate';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
//таймер
countTimer('30 september 2020');
//меню
toggleMenu();
//popup
togglePopup();
//табы
tabs();
//слайдер
slider();
//наша  команнда
replacePhoto();
//Калькуляторs
calculate();
//send-ajax-form
sendForm();