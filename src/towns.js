/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise((resolve, reject) => {
        fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
            .then(response => {
                if (response.status >= 400) {
                    return Promise.reject();
                }
                return response.json();
            })
            .then(towns => {
                resolve(towns.sort((a, b) => b.name > a.name ? -1 : b.name < a.name ? 1 : 0));
            });
    });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

const turnOnLoading = () => {
    loadingBlock.style.display = "block";
    filterBlock.style.display = "none";
}

const turnOffLoading = () => {
    loadingBlock.style.display = "none";
    filterBlock.style.display = "block";
}

const clearSearch = () => {
    while (filterResult.lastChild) {
        filterResult.removeChild(filterResult.lastChild);
    }
}

turnOffLoading();
let towns = [];

filterInput.addEventListener('keyup', async function () {
    // это обработчик нажатия кливиш в текстовом поле
    turnOnLoading();
    clearSearch();

    if (filterInput.value !== '') {
        if (towns.length === 0) {
            towns = await loadTowns();
        }

        for (const town of towns) {
            if (isMatching(town.name, filterInput.value)) {
                const li = document.createElement('li');
                li.textContent = town.name;
                filterResult.appendChild(li);
            }
        }
    }
    turnOffLoading();
    filterInput.focus();

    return filterResult;
});

export {
    loadTowns,
    isMatching
};
