"use strict"

// // массив с фото
let arrImg = ['image_1', 'image_2', 'image_3', 'image_4', 'image_5', 'image_6', 'image_7', 'image_8'];

// кнопки навигации
const prev = document.querySelector('.btn-control__prev')
const next = document.querySelector('.btn-control__next');
// оболочка для слайдов
let rowLine = document.querySelector('.row-images__line');

// глобальные переменные
let step = 6; // шаг слайдов (определяет с какого arrImg[step] добавляется новый слайд) используется в ф. nextDraw() and prevDraw()
let offset = 0; // шаг смещения
let newSlide; // переменная для нового слайда
let mainImageSlider = document.querySelector('.slider__main-image');

// функция: создает и возвращает новый слайд
function createNewSlide(arrImg, step) {
    let newSlide = document.createElement('div');
    newSlide.classList.add('row-images__slide');
    let newImg = document.createElement('img');
    newImg.src = `img/${arrImg[step]}.png`;
    newSlide.appendChild(newImg);
    return newSlide;
}

// цикл отрисовывает слайды 
for (let i = 0; i < arrImg.length; i++) {
    if (i == 0) {
        newSlide = createNewSlide(arrImg, (arrImg.length - 1));
        rowLine.appendChild(newSlide)
    } else if (i < 7) {
        newSlide = createNewSlide(arrImg, (i - 1));
        if (i == 1) {
            newSlide.classList.add('active-slide'); // добавляет рамку на 1 слайд
            newSlide.classList.add('first-slide'); // инициирует первый слайд
        }
        if (i == 5) {
            newSlide.classList.add('last-slide'); // инициирует последний слайд
        }

        rowLine.appendChild(newSlide)
    }
}

// функция: присваивает .active-slide по клику на фото стартовой коллекции слайдов
function assignFrame() {
    let rowSlides = document.querySelectorAll('.row-images__slide');
    rowSlides.forEach(elem => {
        elem.onclick = () => {
            removeActiveClass(rowSlides);
            elem.classList.add('active-slide');
            transmitSrc(elem);
        }
    })
    // рекурсия: перезаписывает коллекцию после каждого клика по документу
    document.onclick = assignFrame;
}
assignFrame();

// функция: передает src активного изображения главному изобр. слайдера
function transmitSrc(elem) {
    mainImageSlider.children[0].src = elem.children[0].src;
}

// событие: клик по кнопке Next
next.onclick = () => {
    moveLeft();
}
// событие: клик по кнопке Prev
prev.onclick = () => {
    moveRight();
}

// функция: отрисовывает следующий слайд
function nextDraw() {
    let newSlide = createNewSlide(arrImg, step);
    newSlide.style.left = offset * 72 + 'px';
    rowLine.appendChild(newSlide)
    // условие: проверяет есть следующий слайд или стоит начать с начала
    if (step + 1 == arrImg.length) {
        step = 0;
    } else {
        step++;
    }
}

// функция: отрисовывает предыдущий слайд
function prevDraw() {
    let newSlide = createNewSlide(arrImg, step);
    newSlide.style.left = offset * 72 + 'px';
    rowLine.prepend(newSlide)

    // условие: проверяет есть ли предыдущий слайд или стоит начать с конца
    if (step == 0) {
        step = arrImg.length - 1;
    } else {
        step--;
    }
}

// функция: удаляет .active-slide передаваемой коллекции
function removeActiveClass(row) {
    row.forEach(elem => {
        elem.classList.remove('active-slide');
    });
}

// функция: смещяет слайды влево
function moveLeft() {
    let slides = document.querySelectorAll('.row-images__slide');
    let offset2 = 0;
    for (let i = 0; i < slides.length; i++) {

        if (slides[i].classList.contains('active-slide') === true) {
            // проверяет местоположение активного слайда
            if (slides[i].classList.contains('last-slide') === true) {
                slides[i].style.left = offset2 * 82 - 82 + 'px';
                offset2++;
                // перемещяет контрольные слайды 
                removeActiveClass(slides);
                slides[i].classList.remove('last-slide');
                slides[i].classList.remove('active-slide');
                slides[i - 4].classList.remove('first-slide');
                i++;
                slides[i].classList.add('last-slide');
                slides[i].classList.add('active-slide');
                slides[i - 4].classList.add('first-slide');
                transmitSrc(slides[i]);
                // рекурсия: вызывает саму себя чтобы процесс был бесконечный
                next.onclick = moveLeft;
                slides[0].remove(); // удаляет крайний левый слайд
                nextDraw(); // отрисовывает следующий слайд

            } else {
                // перемещает рамку без смещения слайдов
                removeActiveClass(slides);
                i++;
                slides[i].classList.add('active-slide');
                // рекурсия: вызывает саму себя чтобы процесс был бесконечный
                next.onclick = moveLeft;
                transmitSrc(slides[i]);
            }
        }
    }
}

// функция: смещяет слайды вправо
function moveRight() {
    let slides = document.querySelectorAll('.row-images__slide');
    let offset2 = 0;
    for (let i = 0; i < slides.length; i++) {

        if (slides[i].classList.contains('active-slide') === true) {
            // проверяет местоположение активного слайда
            if (slides[i].classList.contains('first-slide') === true) {
                slides[i].style.right = offset2 * 82 - 82 + 'px';
                offset2++;
                // перемещяет контрольные слайды 
                removeActiveClass(slides);
                slides[i].classList.remove('first-slide');
                slides[i].classList.remove('active-slide');
                slides[i + 4].classList.remove('last-slide');
                i--;
                slides[i].classList.add('first-slide');
                slides[i].classList.add('active-slide');
                slides[i + 4].classList.add('last-slide');
                transmitSrc(slides[i]);
                // рекурсия: вызывает саму себя чтобы процесс был бесконечный
                prev.onclick = moveRight;
                slides[slides.length - 1].remove(); // удаляет крайний левый слайд
                prevDraw(); // отрисовывает новый слайд

            } else {
                // перемещает рамку без смещения слайдов
                removeActiveClass(slides);
                i--;
                slides[i].classList.add('active-slide');
                // рекурсия: вызывает саму себя чтобы процесс был бесконечный
                prev.onclick = moveRight;
                transmitSrc(slides[i]);
            }
        }
    }
}
