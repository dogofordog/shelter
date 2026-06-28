import { loadPets } from '../../scripts/api.js';
import { initBurger } from '../../scripts/burger.js';
import { initPopup } from '../../scripts/popup.js';
import { initPagination } from '../../scripts/pagination.js';

(async () => {
  try {
    const pets = await loadPets();
    console.log('Загружено питомцев:', pets.length);
    
    initPopup(pets);
    initPagination(pets);
    initBurger();
  } catch (error) {
    console.log('Ошибка:', error.message);
  }
})();