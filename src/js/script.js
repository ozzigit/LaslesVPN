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
