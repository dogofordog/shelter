import { shuffle } from './utils.js';

function initPagination(pets) {
  const cardsContainer = document.querySelector('.pets__cards');
  const paginationContainer = document.querySelector('.pets__pagination');
  
  if (!cardsContainer || !paginationContainer) return;

  const CARDS_PER_PAGE = 8;
  const TOTAL_PAGES = 6;
  let currentPage = 1;

  function generatePetsList() {
    let fullList = [];

    for (let i = 0; i < TOTAL_PAGES; i++) {
      let shuffledPets = shuffle([...pets]);

      if (i > 0) {
        const lastPetOfPrevPage = fullList[fullList.length - 1];
        const firstPetOfCurrentPage = shuffledPets[0];

        if (lastPetOfPrevPage.name === firstPetOfCurrentPage.name) {
          [shuffledPets[0], shuffledPets[1]] = [shuffledPets[1], shuffledPets[0]];
        }
      }

      fullList = fullList.concat(shuffledPets);
    }

    return fullList;
  }

  const allPetsList = generatePetsList();

  function renderPage(pageNumber) {
    cardsContainer.innerHTML = '';

    const startIndex = (pageNumber - 1) * CARDS_PER_PAGE;
    const endIndex = startIndex + CARDS_PER_PAGE;

    const petsToShow = allPetsList.slice(startIndex, endIndex);

    petsToShow.forEach((pet) => {
      const card = document.createElement('div');
      card.className = 'pets__card';
      card.dataset.petName = pet.name;

      card.innerHTML = `
        <img src="${pet.img}" alt="${pet.name}" class="pets__img" />
        <p class="pets__name">${pet.name}</p>
        <button class="pets__button" type="button">Learn more</button>
      `;

      cardsContainer.appendChild(card);
    });
  }

  function updateControls() {
    const btnBegin = document.querySelector('.pets__pagination-arrow--begin');
    const btnPrev = document.querySelector('.pets__pagination-arrow--previous');
    const btnNext = document.querySelector('.pets__pagination-arrow--next');
    const btnEnd = document.querySelector('.pets__pagination-arrow--end');
    const pageNumSpan = document.querySelector('.pets__pagination-current');

    pageNumSpan.textContent = currentPage;

    if (currentPage === 1) {
      btnBegin.disabled = true;
      btnPrev.disabled = true;
    } else {
      btnBegin.disabled = false;
      btnPrev.disabled = false;
    }

    if (currentPage === TOTAL_PAGES) {
      btnNext.disabled = true;
      btnEnd.disabled = true;
    } else {
      btnNext.disabled = false;
      btnEnd.disabled = false;
    }
  }

  paginationContainer.addEventListener('click', (event) => {
    const target = event.target.closest('button');
    if (!target) return;

    if (target.classList.contains('pets__pagination-arrow--begin')) {
      currentPage = 1;
    } 
    else if (target.classList.contains('pets__pagination-arrow--previous')) {
      if (currentPage > 1) currentPage--;
    } 
    else if (target.classList.contains('pets__pagination-arrow--next')) {
      if (currentPage < TOTAL_PAGES) currentPage++;
    } 
    else if (target.classList.contains('pets__pagination-arrow--end')) {
      currentPage = TOTAL_PAGES;
    }

    renderPage(currentPage);
    updateControls();
  });

  renderPage(currentPage);
  updateControls();
}

export { initPagination };