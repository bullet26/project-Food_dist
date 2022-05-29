require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

        import tabs from './modules/tabs';
        import modal from './modules/modal';
        import timer from './modules/timer';
        import cards from './modules/cards';
        import calc from './modules/calc';
        import forms from './modules/forms';
        import slider  from './modules/slider';
        import {openModal} from './modules/modal';
        

        document.addEventListener("DOMContentLoaded", () => {   

        const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000); // открытие модального окна через заданное время  

tabs('.tabheader__item','.tabcontent','.tabheader__items', 'tabheader__item_active');
modal('[data-modal]','.modal', modalTimerId);
cards();
calc();
forms('form', modalTimerId);
timer('.timer', '2022-06-11');
slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        slide: '.offer__slide',
        field: '.offer_slider-inner'
});

});



