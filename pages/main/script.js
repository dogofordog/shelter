import { loadPets } from '../../scripts/api.js';
import { initBurger } from '../../scripts/burger.js';
import { initPopup } from '../../scripts/popup.js';
import { initCarousel } from '../../scripts/carousel.js';

(async () => {
  try {
    const pets = await loadPets();
    console.log('Загружено питомцев:', pets.length);
    
    initPopup(pets);
    initCarousel(pets);
    initBurger();
  } catch (error) {
    console.log('Ошибка:', error.message);
  }
})();