import { shuffle } from './utils.js';

function initCarousel(pets) {
  const cardsContainer = document.querySelector('.pets__cards');
  if (!cardsContainer) return;

  let currentGroup = [];
  let isAnimating = false;

  function getGroupSize() {
    if (window.matchMedia('(min-width: 1280px)').matches) return 3;
    if (window.matchMedia('(min-width: 768px)').matches) return 2;
    return 1;
  }

  function getNextGroup() {
    const groupSize = getGroupSize();
    const available = pets.filter(
      (pet) => !currentGroup.some((c) => c.name === pet.name)
    );
    return shuffle(available).slice(0, groupSize);
  }

  function renderGroup(group) {
    cardsContainer.innerHTML = '';
    group.forEach((pet) => {
      const card = document.createElement('div');
      card.className = 'pets__card';
      card.dataset.petName = pet.name;
      card.innerHTML = `
        <img src="${pet.img}" alt="${pet.name}" class="pets__img" />
        <p class="pets__name">${pet.name}</p>
        <a href="#" class="pets__button">Learn more</a>
      `;
      cardsContainer.appendChild(card);
    });
    currentGroup = group;
  }

  function showNextGroup() {
    if (isAnimating) return; // игнорируем повторные клики во время анимации
    isAnimating = true;

    cardsContainer.classList.add('pets__cards--out');

    cardsContainer.addEventListener('transitionend', function handleOut() {
      cardsContainer.removeEventListener('transitionend', handleOut);
      renderGroup(getNextGroup());
      cardsContainer.classList.remove('pets__cards--out');
      cardsContainer.classList.add('pets__cards--in');

      cardsContainer.addEventListener('transitionend', function handleIn() {
        cardsContainer.removeEventListener('transitionend', handleIn);
        cardsContainer.classList.remove('pets__cards--in');
        isAnimating = false;
      }, { once: true });
    }, { once: true });
  }

  renderGroup(getNextGroup()); // первая группа при загрузке

  document.addEventListener('click', (event) => {
    if (event.target.closest('.pets__arrow--right') || event.target.closest('.slider__arrow-next')) {
      showNextGroup();
      return;
    }
    if (event.target.closest('.pets__arrow--left') || event.target.closest('.slider__arrow-prev')) {
      showNextGroup();
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (currentGroup.length !== getGroupSize()) {
        renderGroup(getNextGroup());
      }
    }, 200);
  });
}

export { initCarousel };