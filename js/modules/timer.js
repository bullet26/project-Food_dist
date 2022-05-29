function timer(id, deadline) {
    //timer
  
    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()), // получаем timestamp конечного времени и отнимаем текущ дату 
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // t / на кол-во мс в одном дне и округлить
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), // t / на кол-во мс в одном часе и получаем остаток от деления на 24 
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) { // если число < 10 дорисывем перед ним 0 
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) { // находит элементы на странице 
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); // обновляем таймер каждую секунду

        updateClock();
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
            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }


    }
    setClock(id, deadline);
}

export default timer;