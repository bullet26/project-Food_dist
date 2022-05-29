'use strict';
document.addEventListener("DOMContentLoaded", () => {
    //tabs
const tabs = document.querySelectorAll ('.tabheader__item'),
      tabsContent = document.querySelectorAll ('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

function HideTabContent () { // скрывает все табы 
    tabsContent.forEach (item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });
    tabs.forEach (item => { // удаляет class активности 
        item.classList.remove('tabheader__item_active');
    });
}

function ShowTabContent (i = 0) { // отображает активный (выбранный) таб / i - порядковый номер
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}
HideTabContent ();
ShowTabContent (); // не указан аргумент функции и она примет значение по умолчанию

tabsParent.addEventListener ('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => { // перебираем все табы из псевдомасиива tabs
            if (target == item) { // и сравниваем каждый с event.target
                HideTabContent ();
                ShowTabContent (i);
            }
        });
    }
});
//timer
const deadline = '2022-02-09';
function getTimeRemaining(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()), // получаем timestamp конечного времени и отнимаем текущ дату 
        days = Math.floor(t/(1000 * 60 * 60 * 24)), // t / на кол-во мс в одном дне и округлить
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),  // t / на кол-во мс в одном часе и получаем остаток от деления на 24 
        minutes = Math.floor ((t / (1000 * 60) % 60)),
        seconds = Math.floor ((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
}

function getZero (num) { // если число < 10 дорисывем перед ним 0 
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock (selector, endTime) { // находит элементы на странице 
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000); // обновляем таймер каждую секунду

          updateClock ();
           // запускаем сразу ф-цию, чтобы при загрузке страницы было расчетно евремя, а не из верстки
        // далее она бдет запускаться по интервалу 

         function updateClock() {
             const t = getTimeRemaining(endTime); 
             // создали ф-цию выше // значение endTime получаем как аргумент ф-ции setClock

             // в селектор, кот получили в setClock записываем значение days из объекта в getTimeRemaining
             days.innerHTML = getZero(t.days); 
             hours.innerHTML = getZero(t.hours);
             minutes.innerHTML = getZero(t.minutes);
             seconds.innerHTML = getZero(t.seconds);  

             // если общщее кол-во мс из объекта в getTimeRemaining <0 время вышло - останавливаем обновление таймера
            if(t.total <= 0) { 
                clearInterval(timeInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
         } 


}
setClock('.timer', deadline);

// modal

const modalCall = document.querySelectorAll('[data-modal]');
const modalForm = document.querySelector('.modal');
//const modalClose = document.querySelector('[data-close]'); // // не актуально, используем делегировани


function openModal() {
    // modalForm.style.display = 'block'; 
    modalForm.classList.add('show');
    modalForm.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // когда открывается modal - запрещается прокрутка страницы сайта
    clearInterval (modalTimerId);
}

     
modalCall.forEach((item) => {
    item.addEventListener('click', openModal);
});


function closeModal () {
// modalForm.style.display = 'none';
    modalForm.classList.remove('show');
    modalForm.classList.add('hide');
    document.body.style.overflow = ''; // браузер автоматически подставит нужное значение вместо hidden

}
// modalClose.addEventListener('click', closeModal); // не актуально, используем делегирование

// закрыть окно по клику на подложку, т.е event таргет модальное окно, а не modal__dialog 
// если куда кликнул пользователь = модальное окно, то закрываем модал
// ИЛИ событие содержит атрибут data-close - это крестик 
modalForm.addEventListener('click', (event)=> {  
    if (event.target === modalForm || event.target.getAttribute('data-close') == '') { 
        closeModal();
    }

});

// отслеживать нажатие Esc и закрывать форму Ы
document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modalForm.classList.contains('show')) {
        closeModal();
    }
});



const modalTimerId = setTimeout(openModal, 50000); // открытие модального окна через заданное время

   //если пользователь долистал страницу до конца показать окно
function showModalByScroll() { 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }


window.addEventListener('scroll', showModalByScroll);

//Используем классы для карточек

/*     class MenuforDay {
        constructor (image,subtitle,descriptionText,cost,i) {
            this.image = image;
            this.subtitle = subtitle;
            this.descriptionText = descriptionText;
            this.cost = cost;
            this.i=i;
        }
        changes () {
            document.querySelectorAll('.menu__item-subtitle')[this.i].previousElementSibling.src = `${this.image}`;
            document.querySelectorAll('.menu__item-subtitle')[this.i].innerHTML =`${this.subtitle}`;
            document.querySelectorAll('.menu__item-descr')[this.i].innerHTML = `${this.descriptionText}`;
            document.querySelectorAll('.menu__item-total')[this.i].innerHTML = `<span>${this.cost}</span> грн/день`;
        }
    }

const Premium = new MenuforDay(`https://naurok-test2.nyc3.digitaloceanspaces.com/1440845/images/195849_1634481189.jpg`,'Меню "Премиум_test"','jhvgcfb nmjo;lbjkvh g','200',1);
const Fitness = new MenuforDay(`https://naurok-test2.nyc3.digitaloceanspaces.com/1440845/images/195849_1634481189.jpg`,'Меню "Фитнес_test"','jhvgcfb nmjo;lbjkvh g','100',0);
const Meatless = new MenuforDay(`https://naurok-test2.nyc3.digitaloceanspaces.com/1440845/images/195849_1634481189.jpg`,'Меню "Постное_test"','jhvgcfb nmjo;lbjkvh g','300',2);
Premium.changes();
Fitness.changes();
Meatless.changes(); */

class MenuCard {
    constructor (src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;

        this.changeToUAH();
        
    }

    changeToUAH() {
        this.price = +this.price*this.transfer;
    }

    render() {
        const element = document.createElement('div');
        if (this.classes.length === 0) {
            this.classes = 'menu__item';
            element.classList.add(this.classes);
        } else { 
            this.classes.forEach(className => element.classList.add(className));

        }
        element.innerHTML = `
            <img src=${this.src} alt=${this.title}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
       `;
       this.parent.append(element);
    }

}

// создаем новый объект и используем на нем метод render, но после к нему нельзя будет обратиться он исчезнет после использования
// т.к на него нет никаких ссылок  - подходит когда объект нужно использовать 1 раз
new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    "menu__item",
    "big"
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    12,
    '.menu .container',
    "menu__item"
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    10,
    '.menu .container',
    "menu__item"
).render();

////////////////////

class MenuCard {
    constructor (src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;

        this.changeToUAH();
        
    }

    changeToUAH() {
        this.price = +this.price*this.transfer;
    }

    render() {
        const element = document.createElement('div');
        if (this.classes.length === 0) {
            this.classes = 'menu__item';
            element.classList.add(this.classes);
        } else { 
            this.classes.forEach(className => element.classList.add(className));

        }
        element.innerHTML = `
            <img src=${this.src} alt=${this.title}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
       `;
       this.parent.append(element);
    }

}
 //PROMISE КОТОПЫЙ ЗАПУСКАЕТСЯ ПРИ ПОМОЩИ fetch 
 //НЕ ПЕРЕЙДЕТ В СОТСОЯНИЕ reject (ОТКЛОНЕНО) ИЗ-ЗА ОТВЕТА HTTP КОТОРЫЙ СЧИТАЕТСЯ ОШИБКОЙ 
 // обработаем такие ошибки через условие проверки статуса и конструируем новый объект ошибки чтобы сработал catch

const getResource = async (url) => { // get запрос // получаем инфо для карточек
    const res = await fetch(url);
    if (!res.ok) {  // если что-то пошло не так, те не ок
        throw new Error(`Could not fetch ${url}, status: ${res.status}`); // конструируем новый объект ошибки 
    }
    
    return await res.json();  //преобразовываем promise (then)  в формат json 
};

// getResource('http://localhost:3000/menu')
// .then(data => {     // получаем в ответ массив не в json можем сразу с ним работать
//     data.forEach(({img, altimg, title, descr, price}) => {
//         new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // 'menu .container' - где создать карточку 
//     });
// });

axios.get('http://localhost:3000/menu')
.then(data => {
    data.data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
             });
});

// // второй вариант создания карточки меню не через сlass 
// getResource('http://localhost:3000/menu')
// .then(data => createCard(data));

// function createCard(data) {
//     data.forEach(({img, altimg, title, descr, price}) => {
//         const element = document.createElement('div');
//         element.classList.add('menu__item');
//         element.innerHTML = `
//         <img src=${img} alt=${altimg}>
//         <h3 class="menu__item-subtitle">${title}</h3>
//         <div class="menu__item-descr">${descr}</div>
//         <div class="menu__item-divider"></div>
//         <div class="menu__item-price">
//             <div class="menu__item-cost">Цена:</div>
//             <div class="menu__item-total"><span>${price}</span> грн/день</div>
//         </div>
//         `;

//         document.querySelector('.menu .container').append(element);
//     });
// }

//////////////////////////////

    // создаем новый объект и используем на нем метод render, но после к нему нельзя будет обратиться он исчезнет после использования
    // т.к на него нет никаких ссылок  - подходит когда объект нужно использовать 1 раз
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        "menu__item",
        "big"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        12,
        '.menu .container',
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        10,
        '.menu .container',
        "menu__item"
    ).render();
};

//////////////////////////


// forms

const forms = document.querySelectorAll('form');

const message = {
    loading: 'icons/spinner.svg',
    success: "Спасибо! Скоро с Вами свяжемся",
    failure: 'Что-то пошло не так'
};

forms.forEach(item => { // подвязать под каждую форму функцию postData
    bindpostData(item);
});

// async - значит внутри ф-ции асихронный код
// await - ставим где нужно дождаться ответа от сервера /окончания результата запроса 


const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();  //преобразовываем promise (then)  в формат json 
};

function bindpostData (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // отменяем стандартное поведение - перезагрузка страницы

        const statusMessage = document.createElement('img'); // создаем блок, который выведет пользователю текстовое сообщение
        statusMessage.src = message.loading; // будет подгружаться картинка, кот задана в loading
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto; 
        `;
        statusMessage.textContent = message.loading;
        //form.append(statusMessage); используем insertAdjacentElement вместо append
        form.insertAdjacentElement('afterend', statusMessage); // позволяет помещать эл-ты в верстку 

        const formData = new FormData(form); // form из которой нужно получить данные 

        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        
           postData('http://localhost:3000/requests', json)
          .then(data => { // data, данные кот возвращаются из Promise, т.е. то что вернул сервер
            console.log('Form send');
            console.log(data);
            showThanksModal(message.success); // запускаем новое модал окно
            statusMessage.remove(); // используется только для сообщения load - cпинер

        }).catch(() => {
            showThanksModal(message.failure); // запускаем новое модал окно
        }).finally(() => {
            form.reset(); // очистить данные формы
        });



    });
    
}

function showThanksModal (message) {
   
    const prevModalDialog = document.querySelector('.modal__dialog');  // обращаемся к диалоговому окну
    prevModalDialog.classList.add('hide'); // скрываем его
    openModal(); // ф-цию реализовали ранее, отвечает за открытие модального окна

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog'); // заменяем одно диалог окно другим и обеспечиваем ном отображение
    thanksModal.innerHTML = `
    <div class="modal__content">
    <div class="modal__close" data-close>×</div>
    <div class="modal__title">${message}</div>
    </div>
    `;
    document.querySelector('.modal').append(thanksModal); // помещаем блок в код страницы 
    setTimeout(() => {
        thanksModal.remove(); // возвращаем модальное окно в исходное состояние / удаляем вновь созданный блок
        prevModalDialog.classList.add('show'); // отображаем изначальное модал окно
        prevModalDialog.classList.remove('hide'); // отображаем изначальное модал окно
        closeModal();
    }, 4000); 

}

// slider

const slider = document.querySelectorAll('.offer__slide'),
      currentslider = document.querySelector('#current'),
      clickprev = document.querySelector('.offer__slider-prev'),
      clicknext = document.querySelector('.offer__slider-next'),
      slidertotal = slider.length,
      total= document.querySelector('#total'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer_slider-inner'),
      width = window.getComputedStyle(slidesWrapper).width; 
      // ширина блока wrapper стиль примененный - будет = ширине окошка слайдера
let index = 1;
let offset = 0;

function indexTotal() {
    if(slider.length < 10) { //  прописываем количество всего слайдов
        total.textContent =`0${slider.length}`;
        currentslider.textContent = `0${index}`;
    } else {
        total.textContent =`${slider.length}`;
        currentslider.textContent = `${index}`;
    }
}

function indexCurrent() {
if (slider.length < 10) {
    currentslider.textContent = `0${index}`;
} else {
    currentslider.textContent = `${index}`;
}
}
indexTotal();


slidesField.style.width = 100 * slider.length + '%'; // ширина = 100% * на количество слайдов 
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';  // скрываем все элементы, кот не поадают в область видимости
slider.forEach(slide => {
    slide.style.width = width; // делаем все блоки одинаковой ширины
});

function deleteNotDigits(str) {
   return +str.replace(/\D/g, '');
}

clicknext.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slider.length - 1)){ // долистали до конца 
        // slice(0, width.length - 2) - также нужно значение width убрать px и оставить число 
        offset = 0;
    } else {
        offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    console.log('+');

    if (index == slider.length) { // дошли до конца - нужно вернуться к началу
        index = 1;
    } else {
        index ++;
    }

    indexCurrent();

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[index-1].style.opacity = 1;

});

clickprev.addEventListener('click', () => {
    if (offset == 0) { // долистали до начала 
        // slice(0, width.length - 2) - также нужно значение width убрать px и оставить число 
        offset = deleteNotDigits(width) * (slider.length - 1);

    } else {
        offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    console.log('-');

    if (index == 1) { // дошли до началa - нужно вернуться к концу
        index = slider.length;
    } else {
        index --;
    }

    indexCurrent();
    
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[index-1].style.opacity = 1;
});


// Мой вариант

// currentslider.innerHTML = `0${index}`;

// function slide () {
//     slider.forEach((item) => {
//         item.classList.remove('show');
//         item.classList.add('hide'); 
//     });
//     slider[index-1].classList.add('show'); 
//     slider[index-1].classList.remove('hide'); 
// }

// slide ();

// function showindex () {
//  if (index < 10 && index > 0 && index <= slidertotal) {
//     currentslider.innerHTML = `0${index}`;
//     slide ();
// } else if (index > 0 && index <= slidertotal) {
//     currentslider.innerHTML = `${index}`;
//     slide ();
// } else if (index > slidertotal) {
//     index = 1;
//     showindex ();
// }else {
//     index = slidertotal;
//     showindex ();
// }
// }

// clickprev.addEventListener('click', () => {
//     index -= 1;
//     showindex ();
// });

// clicknext.addEventListener('click', () => {
//     index += 1;
//     showindex ();
// });

// Ivan variant
// ShowSlides(index); // первичное отображение слайда

// if(slider.length < 10) { //  прописываем количество всего слайдов
//     total.textContent =`0${slider.length}`;
// } else {
//     total.textContent =`${slider.length}`;
// }

// function ShowSlides (n) {
//     if (n > slider.length) {
//         index = 1;
//     }

//     if (n < 1) {
//         index = slider.length;
//     }

//     slider.forEach( item => item.style.display = 'none'); 

//     slider[index -1].style.display = 'block';

//     if(slider.length < 10) { //  прописываем номер текущего слайда
//         currentslider.textContent =`0${index}`;
//     } else {
//         currentslider.textContent =`${index}`;
//     }

// }

// function plusSlides(n) {
//     ShowSlides(index += n); // если значение n = отрицательное то будет отнимать  
// }

// clickprev.addEventListener('click', () => {
//     plusSlides(-1);
// });

// clicknext.addEventListener('click', () => {
//     plusSlides(+1);
// });

// const sliderMain = document.querySelector('.offer__slider'),
// dotWrapper = document.createElement('div');

// sliderMain.style.position = 'relative';

// dotWrapper.classList.add('carousel-indicators');

// sliderMain.append(dotWrapper);

// for ( let i = 0; i <= (slider.length-1); i++) {
//     const divDot = document.createElement('div');
//     divDot.classList.add('dot');
//     dotWrapper.append(divDot);
// }

// dotWrapper.addEventListener('click', (event) => {
//     if (event.target && event.target.matches('div.dot')) {
//         document.querySelectorAll('.dot').forEach((item,i) => {
//             if (event.target == item) {
//                 offset = i*(+width.slice(0, width.length - 2));
//                 slidesField.style.transform = `translateX(-${offset}px)`;
//                 }
          
//         });
//     }    

// });

/// вариант Ивана
const sliderMain = document.querySelector('.offer__slider');
sliderMain.style.position = 'relative';

const indicators = document.createElement('ol'), // обертка для точек
      dots = [];

indicators.classList.add('carousel-indicators');

sliderMain.append(indicators);

for ( let i = 0; i < slider.length; i++) {
    const divDot = document.createElement('li');
    divDot.setAttribute('data-slide-to', i + 1); // доб атрибут к каждому элементу и нумерация атрибута начинается с 2
    divDot.classList.add('dot');

    if (i == 0) {
        divDot.style.opacity = 1; // 1 точка более яркая 
    }
    indicators.append(divDot);
    dots.push(divDot); // создаем массив элементов точек
}

dots.forEach (dot => {
    dot.addEventListener ('click', (e) => {
    const slideTo = e.target.getAttribute('data-slide-to');

   index =  slideTo;
   offset = deleteNotDigits(width)*(slideTo - 1);

   slidesField.style.transform = `translateX(-${offset}px)`;

   indexCurrent();

   dots.forEach(dot => dot.style.opacity = '.5'); // подсвечивать активную точку
   dots[index-1].style.opacity = 1;

   

});

});

//calculator
const result = document.querySelector(".calculating__result span");

let sex,height,weight,age,ratio; 

if(localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
} else {
    sex = 'female';  // значения по умолчанию для значений которые выбраны на сайте
    localStorage.setItem('sex','female');
}

if(localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
} else {
    ratio = '1.375';  // значения по умолчанию для значений которые выбраны на сайте
    localStorage.setItem('ratio','1.375');
}

// Назначить класс активности на элемент выбранный ранее, находим его по записаным в localStorage значениям 
function initLocalSettings(selector, activeClass) {
    const elements =  document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });

}

initLocalSettings('#gender div','calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div','calculating__choose-item_active');

function calcTotal () {
    if (!sex || !height || !weight || !age || !ratio) {// проверка что все поля заполнены т.к. !sex если не заполнено ==  false
    result.textContent = "___";
    return; // чтобы прервать ф-цию досрочно
    }
    if (sex === "female") {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    }
    else { // for male
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}
calcTotal (); // ЗАПУСКАЕМ при загрузке страницы и при каждом измении параметра

function getStaticInformation (selector, activeClass) { // общая ф-ция для пол и Выберите вашу физическая активность
    const elements = document.querySelectorAll(`${selector}`);
    elements.forEach(elem => {
        elem.addEventListener("click", (e) => {
            // если это активность то у нее есть data атрибутdata атрибут, если это пол то у него нет data атрибута // используем id
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); 
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }
            console.log(ratio,sex);
            elements.forEach(elem => {elem.classList.remove(activeClass); //убираем у всех класс активности
            }); 
            e.target.classList.add(activeClass); // назначаем класс активности тому элементу где произошло событие клика
            calcTotal ();
        });
    });
 }

getStaticInformation ('#gender div','calculating__choose-item_active');
getStaticInformation ('.calculating__choose_big div','calculating__choose-item_active');


function getDynamicInformation(selector) {  // for inputs in Ваша конституция
const input = document.querySelector(selector);

input.addEventListener ('input', () => {

    if (input.value.match(/\D/g)) { // если пользлватель ввел не число
        input.style.border = '1px solid red';
    } else {
        input.style.border = 'none';
    }
    switch(input.getAttribute('id')) { // у каждого input свой id  таким образом проверяем в каком поле введены данные 
        case 'height' : 
        height = +input.value;
        break;
        case 'weight' : 
        weight = +input.value;
        break;
        case 'age' : 
        age = +input.value;
        break;
    }
    calcTotal ();
});
}
getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');

});