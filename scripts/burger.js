function initBurger(){
    const mobileMenu = document.querySelector('.mobile_burger');

    function openMenu(){
mobileMenu.classList.add('active');
document.body.classList.add('menu-open')
}    
function closeMenu() {
  mobileMenu.classList.remove('active');
  document.body.classList.remove('menu-open')
}
  function toggleMenu(){
    if (document.body.classList.contains('menu-open')){
        closeMenu();
    }
    else{
        openMenu();
    }
}
document.addEventListener('click', (event)=>{
if(event.target.closest('.burger')){
    toggleMenu()
    return;
}
if (event.target.closest('.mobile_burger .nav__link')) {
  closeMenu();
  return;
}
if (event.target.closest('.mobile_burger') && !event.target.closest('.nav__list')) {
  closeMenu();
}
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
});

}

export { initBurger }
