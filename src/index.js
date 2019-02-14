/* ДЗ 2 - работа с массивами и объектами */

/*
Задание 1:

Напишите аналог встроенного метода forEach для работы с массивами
Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
*/
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
Задание 2:

Напишите аналог встроенного метода map для работы с массивами
Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
*/
function map(array, fn) {
    let result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(fn(array[i], i, array));
    }

    return result;
}
/*
Задание 3:

Напишите аналог встроенного метода reduce для работы с массивами
Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
*/
function reduce(array, fn, initial) {
    let prev = initial || array[0];

    let i = initial ? 0 : 1;

    return (function () {
        for (i; i < array.length; i++) {
            prev = fn(prev, array[i], i, array);
        }

        return prev;
    })();
}

/*
Задание 4:

Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

Пример:
  upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
*/
function upperProps(obj) {
    return Object.keys(obj).map(e => e.toUpperCase());
}

/*
Задание 5 *:

Напишите аналог встроенного метода slice для работы с массивами
Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
*/
function slice(array, from, to) {
    let result = [];

    if (from === undefined || from < 0) {
        from = 0;
    }
    if (to === undefined || to > array.length) {
        to = array.length;
    }
    if (to < 0) {
        to = array.length + to;
    }
    for (let i = from; i < to; i++) {
        result.push(array[i]);
    }

    return result;
}

/*
Задание 6 *:

Функция принимает объект и должна вернуть Proxy для этого объекта
Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
*/
function createProxy(obj) {
    let handler = {
        set(obj, prop, value) {
            obj[prop] = value * value;

            return true;
        }
    };

    return new Proxy(obj, handler);
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};