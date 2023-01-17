import { clearPage } from "../../utils/render";

const HomePage = async () => {
  clearPage();
  displayVille();
  displayRecommende();
};

async function displayVille(){
  const response = await fetch('https://places-exam-api.azurewebsites.net/places');
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const places = await response.json();

  const main = document.querySelector('main');

  const titre = document.createElement('h1');
  titre.innerHTML = 'Les villes';
  titre.style.marginLeft = '15%';

  main.appendChild(titre);

  places.forEach(element => {
    const p = document.createElement('p');
    p.style.marginLeft = '15%';
    p.innerHTML = element.name;
    main.appendChild(p);
  });
}

async function displayRecommende(){
  const response = await fetch('https://places-exam-api.azurewebsites.net/recommended');
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const places = await response.json();

  const main = document.querySelector('main');

  const titre = document.createElement('h1');
  titre.innerHTML = 'recommendée';
  titre.style.marginLeft = '15%';

  main.appendChild(titre);

  const p = document.createElement('p');
  p.innerHTML = places.name;
  main.appendChild(p);
}

export default HomePage;
