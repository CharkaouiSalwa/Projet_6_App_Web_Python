// Data
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function responseToObject(JSONresponse)
{
    let object = JSON.parse(JSONresponse)
    return object
}


const APIbaseUrl = 'http://localhost:8000/api/v1/titles/'


async function getBestMovieData() { // pour récupérer les données de tous les films triés par score IMDb décroissant
  const response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score');
  const data = await response.json();
  return data;
}


// pour afficher le meileur film
fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
  .then(response => response.json())
  .then(data => {
    const meilleurFilm = data.results[0];
    const cadreFilm = document.getElementById('cadre-film');
    cadreFilm.innerHTML = `
      <div class="row">
          <div class="film-info">
            <h2 class ="title-film" >${meilleurFilm.title}</h2>
            <button class="play-button" onclick="ouvrirModal('${meilleurFilm.url}')">Play</button>
            <div class="img-film">
            <img src="${meilleurFilm.image_url}" alt="${meilleurFilm.title}" >
            </div>
          </div>
      </div>
    `;
  })
  .catch(error => console.error(error));

// pour affiche les septs films mieux notés
var page = 1;
let allFilms = [];
while (page < 3) {
  fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page=' + page, { async: false })
    .then(response => response.json())
    .then(data => {
      let topFilms = data.results;
      allFilms = allFilms.concat(topFilms);
      if (allFilms.length == 10) {
        allFilms = allFilms.slice(1, 8);
        const topFilmsList = document.getElementById('top-films-list');
        allFilms.forEach(film => {
          const filmCard = document.createElement('div');
          filmCard.classList.add('top-film-img');
          filmCard.innerHTML = `
            <img src="${film.image_url}" alt="${film.title}" onclick="ouvrirModal('${film.url}')" >
          `;
          topFilmsList.appendChild(filmCard);
        });
        const hiddenFilms = document.querySelectorAll('.top-film-img:nth-child(n+6)');
        hiddenFilms.forEach(film => {
          film.classList.add('hidden');
        });
      }
    })
    .catch(error => console.error(error));
  page++;
}

//pour la navigation des caroussels
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

nextBtn.addEventListener('click', function() {
  navigateFilms(nextBtn);
});

prevBtn.addEventListener('click', function() {
  navigateFilms(prevBtn);
});

function navigateFilms(btn) {
  const topFilmsList = document.getElementById('top-films-list','top-film-genre');
  const visibleFilms = document.querySelectorAll('.top-film-img:not(.hidden)');
  const hiddenFilms = document.querySelectorAll('.top-film-img.hidden');
  const numVisibleFilms = visibleFilms.length;
  const numHiddenFilms = hiddenFilms.length;

  if (btn.id === 'next-btn') {
    if (numHiddenFilms > 0) {
      for (let i = 0; i < 4; i++) {
        visibleFilms[i].classList.add('hidden');
        hiddenFilms[numHiddenFilms - i - 1].classList.remove('hidden');
      }
    }
  } else if (btn.id === 'prev-btn') {
    if (numVisibleFilms > 4) {
      const lastVisibleIndex = numVisibleFilms - 1;
      const firstHiddenIndex = numHiddenFilms - 1;
      for (let i = 0; i < 4; i++) {
        if (lastVisibleIndex - i >= 4) {
          visibleFilms[lastVisibleIndex - i].classList.add('hidden');
          hiddenFilms[firstHiddenIndex + i].classList.remove('hidden');
        } else {
          break;
        }
      }
    }
  }
}


//pour les septs meilleurs films du genre romance
var page = 1;
let allFilmsGenre = [];
while (page < 3)
{
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Romance&page='+page, {async: false})
      .then(response => response.json())
      .then(data => {
        let topFilmGenre = data.results;
        allFilmsGenre = allFilmsGenre.concat(topFilmGenre);
        if (allFilmsGenre.length == 10){
            allFilmsGenre = allFilmsGenre.slice(1,8);
            var element = document.getElementById("top-films-genre");
            element.classList.add("active");
            const topFilmGenre = document.getElementById('top-films-genre');
            allFilmsGenre.forEach(film => {
              const filmGenre = document.getElementById('film-category');
              filmGenre.innerHTML += `
                    <div class="top-film-img">
                        <img src="${film.image_url}" alt="${film.title}" onclick="ouvrirModal('${film.url}')">
                    </div>
              `;
              topFilmGenre.appendChild(filmGenre);
            });
        }
      })
      .catch(error => console.error(error));
      page++;
}

//pour les septs meilleurs films du genre drama
var page = 1;
let allFilmsDrama = [];
while (page < 3)
{
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Drama&page='+page, {async: false})
      .then(response => response.json())
      .then(data => {
        let topFilmDrama = data.results;

        allFilmsDrama = allFilmsDrama.concat(topFilmDrama);
        if (allFilmsDrama.length == 10){
            allFilmsDrama = allFilmsDrama.slice(1,8);

            var element = document.getElementById("top-films-drama");
            element.classList.add("active");


            const topFilmDrama = document.getElementById('top-films-drama');
            allFilmsDrama.forEach(film => {
              const filmDrama = document.getElementById('film-drama');
              filmDrama.innerHTML += `

                    <div class="top-film-img">
                        <img src="${film.image_url}" alt="${film.title}" onclick="ouvrirModal()">
                    </div>
              `;
              topFilmDrama.appendChild(filmDrama);
            });
        }

      })
      .catch(error => console.error(error));
      page++;
}
//pour les septs meilleurs films du genre crime
var page = 1;
let allFilmsCrime = [];
while (page < 3)
{
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Crime&page='+page, {async: false})
      .then(response => response.json())
      .then(data => {
        let topFilmCrime = data.results;

        allFilmsCrime = allFilmsCrime.concat(topFilmCrime);
        if (allFilmsCrime.length == 10){
            allFilmsCrime = allFilmsCrime.slice(1,8);

            var element = document.getElementById("top-films-crime");
            element.classList.add("active");

            const topFilmCrime = document.getElementById('top-films-crime');
            allFilmsCrime.forEach(film => {
              const filmCrime = document.getElementById('film-crime');
              filmCrime.innerHTML += `

                    <div class="top-film-img">
                        <img src="${film.image_url}" alt="${film.title}" onclick="ouvrirModal()">
                    </div>
              `;
              topFilmCrime.appendChild(filmCrime);
            });
        }

      })
      .catch(error => console.error(error));
      page++;
}






// Récupérer la div de la fenêtre modale
const modal = document.getElementById("myModal");

// Récupérer le bouton de fermeture
const closeBtn = document.querySelector(".close");

// Ajouter un événement "click" au bouton de fermeture
closeBtn.addEventListener("click", fermerModal);

// Fonction pour ouvrir la fenêtre modale


function ouvrirModal(myurl){
  // Récupérer les informations du film
   var modal = document.getElementById("myModal");
   fetch(myurl)
    .then(response => response.json())
    .then(data => {

      // Affichage des données dans le modal
      document.getElementById("modal-title").innerHTML = data.original_title;
      document.getElementById("modal-genre").innerHTML = "Genre : " + data.genres.join(", ");
      document.getElementById("modal-release").innerHTML = "Date de sortie : " + data.year;
      document.getElementById("modal-rated").innerHTML = "Classification : " + data.rated;
      document.getElementById("modal-imdb").innerHTML = "IMDb : " + data.imdb_score;
      document.getElementById("modal-director").innerHTML = "Réalisateur : " + data.directors.join(", ");
      document.getElementById("modal-actors").innerHTML = "Acteurs : " + data.actors.join(", ");
      document.getElementById("modal-duration").innerHTML = "Durée : " + data.duration + " minutes";
      document.getElementById("modal-country").innerHTML = "Pays : " + data.countries.join(", ");
      document.getElementById("modal-box-office").innerHTML = "Box-office : " + data.worldwide_gross_income + " $";
      document.getElementById("modal-summary").innerHTML = "Résumé : " + data.description;
    })
    .catch(error => console.log(error));
   // Affichage du modal
  modal.style.display = "block";
}

function fermerModal() {
  // Récupération du modal
  var modal = document.getElementById("myModal");

  // Fermeture du modal
  modal.style.display = "none";
}




