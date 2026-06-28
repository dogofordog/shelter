function initPopup(pets) {
  const popup = document.querySelector('.popup');

  function openPopup(pet) {
    popup.querySelector('.popup__img').src = pet.img;
    popup.querySelector('.popup__img').alt = pet.name;
    popup.querySelector('.popup__name').textContent = pet.name;
    popup.querySelector('.popup__breed').textContent = `Breed: ${pet.breed}`;
    popup.querySelector('.popup__age').textContent = `Age: ${pet.age}`;
    popup.querySelector('.popup__description').textContent = pet.description;
    popup.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closePopup() {
    popup.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  document.addEventListener('click', (event) => {
    const card = event.target.closest('.pets__card');
    if (card) {
      const pet = pets.find((p) => p.name === card.dataset.petName);
      if (pet) openPopup(pet);
      return;
    }

    if (event.target.closest('.popup__close')) {
      closePopup();
      return;
    }

    if (event.target.closest('.popup') && !event.target.closest('.popup__content')) {
      closePopup();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && popup.classList.contains('active')) {
      closePopup();
    }
  });
}

export { initPopup };