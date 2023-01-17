import { clearPage } from '../../utils/render';
import readAllPlaces from '../../utils/places';

const NewPage = () => {
  clearPage();
  renderGoBackHomeButton();
};

function renderGoBackHomeButton() {
  const main = document.querySelector('main');
  const image = document.createElement('img');
  const nom = document.createElement('p');
  
  let i = 2;
  const places = readAllPlaces();
  image.src = places[i].image;
  nom.innerHTML = places[i].name;

  const btnPrevious = document.createElement('button');
  const btnNext = document.createElement('button');
  btnPrevious.textContent = 'Previous';
  btnNext.textContent = 'Next';

  main.appendChild(image);
  

  btnPrevious.addEventListener('click', () => {
    if(i !== 0){
      i -= 1;
    }
    image.src = places[i].image;
    nom.innerHTML = places[i].name;
  });

  btnNext.addEventListener('click', () => {
    if(i !== 4){
      i += 1;
    }
    image.src = places[i].image;
    nom.innerHTML = places[i].name;
  });

  image.style.marginLeft= '25%';
  nom.style.textAlign = 'center';
  btnPrevious.style.marginLeft= '30%';
  btnNext.style.marginLeft= '15%';
  main.appendChild(nom);
  main.appendChild(btnPrevious);
  main.appendChild(btnNext);
}

export default NewPage;
