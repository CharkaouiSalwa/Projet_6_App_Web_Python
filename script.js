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



//pour les septs meilleurs films du genre romance
let allFilmsGenre = [];
var page = 1;
while (page < 3) {
  fetch(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Romance&page=${page}`)
    .then(response => response.json())
    .then(data => {
      const topFilmGenre = document.getElementById('top-films-genre');
      data.results.forEach(film => {
        const filmGenre = document.createElement('div');
        filmGenre.classList.add('top-film-img-gnr');
        filmGenre.innerHTML = `
          <img src="${film.image_url}" alt="${film.title}" onclick="ouvrirModal('${film.url}')">
        `;
        allFilmsGenre.push(filmGenre);
      });
      if (allFilmsGenre.length >= 7) {
        allFilmsGenre = allFilmsGenre.slice(0, 7);
        allFilmsGenre.forEach((film, index) => {
          if (index >= 4) {
            film.classList.add('hidden');
          }
          topFilmGenre.appendChild(film);
        });
      }
    })
    .catch(error => console.error(error));
  page++;
}
//pour les septs meilleurs films du genre drama
let allFilmsDrama = [];
var page = 1;
while (page < 3) {
  fetch(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Drama&page=${page}`)
    .then(response => response.json())
    .then(data => {
      const topFilmDrama = document.getElementById('top-films-drama');
      data.results.forEach(film => {
        const filmDrama = document.createElement('div');
        filmDrama.classList.add('top-film-img-dr');
        filmDrama.innerHTML = `
          <img src="${film.image_url}" alt="${film.title}" onclick="ouvrirModal('${film.url}')">
        `;
        allFilmsDrama.push(filmDrama);
      });
      if (allFilmsDrama.length >= 7) {
        allFilmsDrama = allFilmsDrama.slice(0, 7);
        allFilmsDrama.forEach((film, index) => {
          if (index >= 4) {
            film.classList.add('hidden');
          }
          topFilmDrama.appendChild(film);
        });
      }
    })
    .catch(error => console.error(error));
  page++;
}

//pour les septs meilleurs films du genre crime
let allFilmsCrime = [];
var page = 1;
while (page < 3) {
  fetch(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Crime&page=${page}`)
    .then(response => response.json())
    .then(data => {
      const topFilmCrime = document.getElementById('top-films-crime');
      data.results.forEach(film => {
        const filmCrime = document.createElement('div');
        filmCrime.classList.add('top-film-img-cr');
        filmCrime.innerHTML = `
          <img src="${film.image_url}" alt="${film.title}" onclick="ouvrirModal('${film.url}')">
        `;
        allFilmsCrime.push(filmCrime);
      });
      if (allFilmsCrime.length >= 7) {
        allFilmsCrime = allFilmsCrime.slice(0, 7);
        allFilmsCrime.forEach((film, index) => {
          if (index >= 4) {
            film.classList.add('hidden');
          }
          topFilmCrime.appendChild(film);
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

//pour la navigation des caroussels
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

nextBtn.addEventListener('click', function() {
  navigateFilms(nextBtn);
});

prevBtn.addEventListener('click', function() {
  navigateFilms(prevBtn);
});

const suivBtn = document.getElementById('suiv-btn');
const precBtn = document.getElementById('prec-btn');

suivBtn.addEventListener('click', function() {
  navigateFilms(suivBtn);
});

precBtn.addEventListener('click', function() {
  navigateFilms(precBtn);
});

const suivBtn1 = document.getElementById('suiv-btn-1');
const precBtn1 = document.getElementById('prec-btn-1');

suivBtn1.addEventListener('click', function() {
  navigateFilms(suivBtn1);
});

precBtn1.addEventListener('click', function() {
  navigateFilms(precBtn1);
});

const suivBtn2 = document.getElementById('suiv-btn-2');
const precBtn2 = document.getElementById('prec-btn-2');

suivBtn2.addEventListener('click', function() {
  navigateFilms(suivBtn2);
});

precBtn2.addEventListener('click', function() {
  navigateFilms(precBtn2);
});

function navigateFilms(btn) {
  const topFilmsList = document.getElementById('top-films-list');
  const visibleFilms = document.querySelectorAll('.top-film-img:not(.hidden)');
  const hiddenFilms = document.querySelectorAll('.top-film-img.hidden');
   const numVisibleFilms = visibleFilms.length;
  const numHiddenFilms = hiddenFilms.length;

  const topFilmsGenre = document.getElementById('top-films-genre');
  const visibleFilmsGnr = document.querySelectorAll('.top-film-img-gnr:not(.hidden)');
  const hiddenFilmsGnr = document.querySelectorAll('.top-film-img-gnr.hidden');
  const numVisibleFilmsGnr = visibleFilmsGnr.length;
  const numHiddenFilmsGnr = hiddenFilmsGnr.length;

  const topFilmsDr = document.getElementById('top-films-drama');
  const visibleFilmsDr = document.querySelectorAll('.top-film-img-dr:not(.hidden)');
  const hiddenFilmsDr = document.querySelectorAll('.top-film-img-dr.hidden');
  const numVisibleFilmsDr = visibleFilmsDr.length;
  const numHiddenFilmsDr = hiddenFilmsDr.length;

  const topFilmsCr = document.getElementById('top-films-crime');
  const visibleFilmsCr = document.querySelectorAll('.top-film-img-cr:not(.hidden)');
  const hiddenFilmsCr = document.querySelectorAll('.top-film-img-cr.hidden');
  const numVisibleFilmsCr = visibleFilmsCr.length;
  const numHiddenFilmsCr = hiddenFilmsCr.length;

  if (btn.id === 'next-btn') {
    if (numHiddenFilms > 0) {
      for (let i = 0; i < 4; i++) {
        if (hiddenFilms[i]) {
          hiddenFilms[i].classList.remove('hidden');
        }
        if (visibleFilms[i]) {
          visibleFilms[i].classList.add('hidden');
        }
      }
    }
  } else if (btn.id === 'prev-btn') {
    if (numVisibleFilms >= 3) {
      for (let i = 1; i <= 4; i++) {
        if (visibleFilms[numVisibleFilms - i]) {
          visibleFilms[numVisibleFilms - i].classList.add('hidden');
        }
        if (hiddenFilms[numHiddenFilms - i]) {
          hiddenFilms[numHiddenFilms - i].classList.remove('hidden');
        }
      }
    }
  } else if (btn.id === 'suiv-btn') {
    if (numHiddenFilmsGnr > 0) {
      for (let i = 0; i < 4; i++) {
        if (hiddenFilmsGnr[i]) {
          hiddenFilmsGnr[i].classList.remove('hidden');
        }
        if (visibleFilmsGnr[i]) {
          visibleFilmsGnr[i].classList.add('hidden');
        }
      }
    }
  }else if (btn.id === 'prec-btn') {
    if (numVisibleFilmsGnr >= 3) {
      for (let i = 1; i <= 4; i++) {
        if (visibleFilmsGnr[numVisibleFilmsGnr - i]) {
          visibleFilmsGnr[numVisibleFilmsGnr - i].classList.add('hidden');
        }
        if (hiddenFilmsGnr[numHiddenFilmsGnr - i]) {
          hiddenFilmsGnr[numHiddenFilmsGnr - i].classList.remove('hidden');
        }
      }
    }
}else if (btn.id === 'suiv-btn-1') {
    if (numHiddenFilmsDr > 0) {
      for (let i = 0; i < 4; i++) {
        if (hiddenFilmsDr[i]) {
          hiddenFilmsDr[i].classList.remove('hidden');
        }
        if (visibleFilmsDr[i]) {
          visibleFilmsDr[i].classList.add('hidden');
        }
      }
    }
  }else if (btn.id === 'prec-btn-1') {
    if (numVisibleFilmsDr >= 3) {
      for (let i = 1; i <= 4; i++) {
        if (visibleFilmsDr[numVisibleFilmsDr - i]) {
          visibleFilmsDr[numVisibleFilmsDr - i].classList.add('hidden');
        }
        if (hiddenFilmsDr[numHiddenFilmsDr - i]) {
          hiddenFilmsDr[numHiddenFilmsDr - i].classList.remove('hidden');
        }
      }
    }
  }else if (btn.id === 'suiv-btn-2') {
    if (numHiddenFilmsCr > 0) {
      for (let i = 0; i < 4; i++) {
        if (hiddenFilmsCr[i]) {
          hiddenFilmsCr[i].classList.remove('hidden');
        }
        if (visibleFilmsCr[i]) {
          visibleFilmsCr[i].classList.add('hidden');
        }
      }
    }
  }else if (btn.id === 'prec-btn-2') {
    if (numVisibleFilmsCr >= 3) {
      for (let i = 1; i <= 4; i++) {
        if (visibleFilmsCr[numVisibleFilmsCr - i]) {
          visibleFilmsCr[numVisibleFilmsCr - i].classList.add('hidden');
        }
        if (hiddenFilmsCr[numHiddenFilmsCr - i]) {
          hiddenFilmsCr[numHiddenFilmsCr - i].classList.remove('hidden');
        }
      }
    }
  }
}
