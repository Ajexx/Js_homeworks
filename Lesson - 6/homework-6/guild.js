// Домашнее задание 6. Книжная полка
const books = [
  { title: 'Хоббит', author: 'Толкин' },
  { title: 'Маленький принц', author: 'Сент-Экзюпери' },
  { title: 'Алиса в Стране чудес', author: 'Кэрролл' }
];

const test1 = [];
const test2 = [{ title: 'Biba', author: 'Boba' },];

console.log('Старт! Файл подключён');

// DOM-код пишите здесь. Условия — в слайдах ДЗ.

document.querySelector('#book-placeholder').remove(); // На самом деле ненужная вещь, так как после replaceChildren() placeholder автоматически очищяется

const title = document.querySelector('#library-title');
title.textContent = 'Моя библиотека';

const description = document.querySelector('#library-description');
description.textContent = 'Книги для следующего приключения';

const link = document.querySelector('#library-link');
link.href = '#books';
link.textContent = 'Посмотреть книги';

title.classList.add('ready');

const container = document.querySelector('#books');

renderBooks(test1); // Вывод пустого массива
renderBooks(test2); // Вывод массива с одной карточкой
renderBooks(books); // Вывод всех элементов массива books

function renderBooks(list)
{
    container.replaceChildren();
    let count = 0;
    for(const book of list)
    {   
        count++;
        const hero_card = document.createElement('article');
        hero_card.classList.add("hero-card");

        const h3 = document.createElement('h3');
        h3.textContent = book.title;

        const p = document.createElement('p');
        p.textContent = book.author;
        hero_card.append(h3,p);
        container.append(hero_card);
    }
    const books_ = document.querySelector('#book-count');
    books_.textContent = count;
}
