'use strict';
// consts----------------------------------------------------------
const api_url = 'http://77.120.190.159:8080/api';

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

//----------------------------------------------------------------------
let slick_config = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendDots: $('.buttons__left'),
    appendArrows: $('.buttons__right'),
    prevArrow: $('.left__arrow'),
    nextArrow: $('.right__arrow'),
    centermode: true,
    // autoplay: true,
    // autoplaySpeed: 7000,
    // centerPadding: '50px',
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};
async function render_data_from_rerver() {
    // data downloading---------------------------------------------------

    let flag_is_no_api = false;
    let api_data;
    //bad api
    try {
        const response = await fetch(api_url, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
        });
        api_data = await response.json();
        let new_elm = {};
        new_elm.id = api_data[0].id;
    } catch (request_err) {
        console.error('api request error', request_err.message);
        flag_is_no_api = true;
    }

    if (!flag_is_no_api) {
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
            try {
                // innerHtml variant
                let blank_card = `<div class="customer__card">
                                    <div>
                                        <div class="customer__info">
                                            <div class="customer__photo">
                                                <img
                                                    src="${api_data[obj_index].avatar}"
                                                    alt="customer__photo"
                                                    class="customer__photo-link"
                                                />
                                            </div>
                                            <div class="customer__text">
                                                <span class="customer__name">
                                                    ${api_data[obj_index].name}
                                                </span>
                                                <span class="customer__location">
                                                    ${api_data[obj_index].location}
                                                </span>
                                            </div>
                                            <div class="customer__rating">
                                                <span class="customer__rate">
                                                    ${api_data[obj_index].rating}
                                                </span>
                                                <div class="customer__star">
                                                    <img
                                                        src="/img/section/customers/star.png"
                                                        alt="star"
                                                        class="customer__star"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <p class="customer__comment">
                                            ${api_data[obj_index].message}
                                        </p>
                                    </div>
                                </div>`;
                card_list.innerHTML += blank_card;

                // querySelector variant
                /*               
                let new_card = card_example.cloneNode(true);
                new_card.querySelector('.customer__name').innerText =
                    api_data[obj_index].name;
                new_card.querySelector('.customer__location').innerText =
                    api_data[obj_index].location;
                new_card.querySelector('.customer__photo-link').src =
                    api_data[obj_index].avatar;
                new_card.querySelector('.customer__comment').innerText =
                    api_data[obj_index].message;
                new_card.querySelector('.customer__rate').innerText =
                    api_data[obj_index].rating;
                card_list.append(new_card);
                */
            } catch (pars_err) {
                console.error('api stucture error', pars_err.message);
            }
        }
    }

    // render slides
    $('.customers__cards').slick(slick_config);
}

//upload  and render data from api
render_data_from_rerver();
