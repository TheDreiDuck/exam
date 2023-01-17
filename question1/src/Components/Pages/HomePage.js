import readAllPlaces from '../../utils/places';
import { clearPage } from '../../utils/render';

const HomePage = () => {
  clearPage();
  const main = document.querySelector('main');
  const title = document.createElement('h1');
  title.innerHTML = 'Places to visit';
  title.style.textAlign = 'center';
  main.appendChild(title);

  const places = readAllPlaces();
  places.forEach(place => {
    const p = document.createElement('p');
    p.style.textAlign = 'center';
    p.innerText = place.name;
    main.appendChild(p);
  });
  
};

export default HomePage;
