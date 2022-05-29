function calc() {
    //calculator
    const result = document.querySelector(".calculating__result span");

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female'; // значения по умолчанию для значений которые выбраны на сайте
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375'; // значения по умолчанию для значений которые выбраны на сайте
        localStorage.setItem('ratio', '1.375');
    }

    // Назначить класс активности на элемент выбранный ранее, находим его по записаным в localStorage значениям 
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

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

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) { // проверка что все поля заполнены т.к. !sex если не заполнено ==  false
            result.textContent = "___";
            return; // чтобы прервать ф-цию досрочно
        }
        if (sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else { // for male
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal(); // ЗАПУСКАЕМ при загрузке страницы и при каждом измении параметра

    function getStaticInformation(selector, activeClass) { // общая ф-ция для пол и Выберите вашу физическая активность
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
                console.log(ratio, sex);
                elements.forEach(elem => {
                    elem.classList.remove(activeClass); //убираем у всех класс активности
                });
                e.target.classList.add(activeClass); // назначаем класс активности тому элементу где произошло событие клика
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


    function getDynamicInformation(selector) { // for inputs in Ваша конституция
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) { // если пользлватель ввел не число
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')) { // у каждого input свой id  таким образом проверяем в каком поле введены данные 
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calc;