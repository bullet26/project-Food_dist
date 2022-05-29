function tabs(tabsSelector, tabsContentSelector, tabsParentSElector, activeClass) {
    //tabs
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSElector);

    function HideTabContent() { // скрывает все табы 
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => { // удаляет class активности 
            item.classList.remove(activeClass);
        });
    }

    function ShowTabContent(i = 0) { // отображает активный (выбранный) таб / i - порядковый номер
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    HideTabContent();
    ShowTabContent(); // не указан аргумент функции и она примет значение по умолчанию

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => { // перебираем все табы из псевдомасиива tabs
                if (target == item) { // и сравниваем каждый с event.target
                    HideTabContent();
                    ShowTabContent(i);
                }
            });
        }
    });
}

export default tabs;