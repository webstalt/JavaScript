/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дoбавляемая cookie не соответствуeт фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');

// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');

// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');

// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');

// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const showCookieObj = () => {
    let allCookies;
    document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        allCookies = prev;
        return prev;
    }, {});

    return allCookies;
};

const deleteCookie = (name) => {
    let expires = '';
    let d = new Date();
    d.setTime(d.getTime() - 8000);
    expires = d.toUTCString();

    document.cookie = `${name}=nope; expires=${expires}`;
};

const clearTable = () => {
    while (listTable.lastChild) {
        listTable.removeChild(listTable.lastChild);
    }
};

const createRow = (cookie, allCookies) => {
    let tr = document.createElement('tr');
    listTable.appendChild(tr);
    let tdName = document.createElement('td');
    let tdValue = document.createElement('td');
    let tdDelete = document.createElement('td');
    let deleteButton = document.createElement('button');
    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tr.appendChild(tdDelete);
    tdName.innerText = cookie;
    tdValue.innerText = allCookies[cookie];
    tdDelete.appendChild(deleteButton);
    deleteButton.innerHTML = 'удалить';

    deleteButton.addEventListener('click', () => {
        deleteCookie(cookie)
        clearTable();
        displayCookies(filterNameInput.value);
    });
}

const displayCookies = (filterValue) => {
    let allCookies = showCookieObj();

    for (let cookie in allCookies) {
        if (!cookie) return;

        if (filterValue && filterValue.length) {
            if (cookie.indexOf(filterValue) !== -1 || allCookies[cookie].indexOf(filterValue) !== -1) {
                createRow(cookie, allCookies);
            }
        } else {
            createRow(cookie, allCookies);
        }
    }
};

const addNewCookie = () => {
    if (!addNameInput.value) return;
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
};

const addNewCookieEvent = () => {
    addNewCookie();
    addNameInput.value = '';
    addValueInput.value = '';
    clearTable();
    displayCookies(filterNameInput.value);
}

addButton.addEventListener('click', () => {
    addNewCookieEvent();
});

addValueInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        addNewCookieEvent();
    }
});

filterNameInput.addEventListener('keyup', function () {
    clearTable();
    displayCookies(filterNameInput.value);
});

displayCookies();
