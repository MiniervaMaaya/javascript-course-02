'use strict';

// const modalEl = document.querySelector('.modal');

// const overlayEl = document.querySelector('.overlay');

// const btnCloseModelEl = document.querySelector('.close-modal');

// const btnsOpenModalEl = document.querySelectorAll('.show-modal');

// const openModal = function () {
//   modalEl.classList.remove('hidden');
//   overlayEl.classList.remove('hidden');
// };

// const closeModal = function () {
//   modalEl.classList.add('hidden');
//   overlayEl.classList.add('hidden');
// };

// btnsOpenModalEl.forEach(btn => {
//   btn.addEventListener('click', openModal);
// });

// btnCloseModalEl.addEventListener('click', closeModal);

// overlayEl.addEventListener('click', closeModal);

const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');
const btnsCloseModalEl = document.querySelector('.close-modal');
const btnsOpendModalEl = document.querySelector('.show-modal');

const openModal =function (){
    modalEl.classList.remove('hidden');
    overlayEl.classList.remove('hidden');

};

const closeModal = function () {
    modalEl.classList.add('hidden');
    overlayEl.classList.add('hidden');

};

btnsOpendModalEl.forEach(btn => btn.addEventListener('click', openModal));
btnsCloseModalEl.adddEventListener('click', closeModal);
overlayEl.addEventListener('click', closeModal);
