async function loadPets() {
    const response = await fetch('../../pets.json');
    if (!response.ok){
    throw new Error 
        ('result is not loaded');
    }
return response.json();
}
export { loadPets };