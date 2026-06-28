import { loadPets } from '../../scripts/api.js';
import { initBurger } from '../../scripts/burger.js';
import { initPopup } from '../../scripts/popup.js';



(async () => {
  try {
    const pets = await loadPets();
    console.log(pets);
    initPopup(pets);
  } catch (error) {
    console.log('Ошибка:', error.message);
  }
})();


(async () => {
  try {
    const pets = await loadPets();
    console.log(pets);
  } catch (error) {
    console.log('Ошибка:', error.message);
  }
})();

initBurger();