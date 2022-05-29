
    function closeModal(modalSelector) {
        const modalForm = document.querySelector(modalSelector);
        modalForm.classList.remove('show');
        modalForm.classList.add('hide');
        document.body.style.overflow = ''; // браузер автоматически подставит нужное значение вместо hidden

    }
    
    function openModal(modalSelector, modalTimerId) {
       const modalForm = document.querySelector(modalSelector);
        modalForm.classList.add('show');
        modalForm.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // когда открывается modal - запрещается прокрутка страницы сайта

        console.log(modalTimerId);
        if (modalTimerId) { // если  modalTimerId был передан то
            clearInterval(modalTimerId);
        }
    }

function modal(triggerSelector, modalSelector, modalTimerId) {
    // modal

    const modalCall = document.querySelectorAll(triggerSelector);
    const modalForm = document.querySelector(modalSelector);


    modalCall.forEach((item) => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    // закрыть окно по клику на подложку, т.е event таргет модальное окно, а не modal__dialog 
    // если куда кликнул пользователь = модальное окно, то закрываем модал
    // ИЛИ событие содержит атрибут data-close - это крестик 
    modalForm.addEventListener('click', (event) => {
        if (event.target === modalForm || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }

    });

    // отслеживать нажатие Esc и закрывать форму Ы
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalForm.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    //если пользователь долистал страницу до конца показать окно
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }


    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};