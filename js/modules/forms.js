import{closeModal, openModal} from './modal';

import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    // forms

const forms = document.querySelectorAll(formSelector);

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
    openModal('.modal', modalTimerId); // ф-цию реализовали ранее, отвечает за открытие модального окна

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
        closeModal('.modal');
    }, 4000); 

}
}

export default forms;