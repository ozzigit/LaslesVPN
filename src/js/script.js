'use strict';
// consts----------------------------------------------------------
const api_url = 'http://127.0.0.1:8000/api';

// burger----------------------------------------------------------
let menuButton = document.querySelector('.header__menuButton');
let menuList = document.querySelector('.header__nav');
let sign = document.querySelector('.header__sign');
let burger = document.querySelector('.burger');

function toggleClass() {
    burger.classList.toggle('burger__close');
    burger.classList.toggle('burger__open');
    menuList.classList.toggle('hidden');
    sign.classList.toggle('hidden');
}
menuButton.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleClass();
});

document.addEventListener('click', function (e) {
    const target = e.target;
    const thsmenu = target == menuList || menuList.contains(target);
    const thssign = target == sign || sign.contains(target);
    const menuIsActive = menuList.classList.contains('hidden');
    if (!thsmenu && !menuIsActive && !thssign) {
        // if (!thsmenu && menuIsActive && !thssign) {
        toggleClass();
    }
});

async function render_data_from_rerver() {
    // data downloading---------------------------------------------------
    const response = await fetch(api_url, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
    });
    const api_data = await response.json();
    //bad api
    try {
        let new_elm = {};
        new_elm.id = api_data[0].id;
    } catch (pars_err) {
        console.error('api stucture error', pars_err.message);
        return;
    }

    let card_example = document
        .querySelector('.customer__card')
        .cloneNode(true);

    let card_list = document.querySelector('.customers__cards');
    //clear default list
    while (card_list.firstChild) {
        card_list.removeChild(card_list.firstChild);
    }

    // rendering data ------------------------------------------------
    for (let obj_index in api_data) {
        // try {
        let new_card = card_example.cloneNode(true);
        new_card.querySelector('.customer__name').innerText =
            api_data[obj_index].name;
        new_card.querySelector('.customer__location').innerText =
            api_data[obj_index].location;
        // new_card.queryselector('.customer__photo-link').src =
            // api_data[obj_index].avatar;
        console.log(api_data[obj_index].avatar)

        new_card.querySelector('.customer__comment').innerText =
            api_data[obj_index].message;
        new_card.querySelector('.customer__rate').innerText =
            api_data[obj_index].rating;
        card_list.append(new_card);
        // } catch (pars_err) {

        // console.error('api stucture error', pars_err.message);
        // }
    }
}
// render_data_from_rerver();
