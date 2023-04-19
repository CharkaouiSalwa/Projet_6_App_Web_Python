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


/*<button  class="play-button" onclick="ouvrirModal()" ><i class="fa fa-play"></i> Play</button>*/
fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
  .then(response => response.json())
  .then(data => {
    const meilleurFilm = data.results[0];
    const cadreFilm = document.getElementById('cadre-film');
    cadreFilm.innerHTML = `
      <div class="row">
          <div class="film-info">
            <h2 class ="title-film" >${meilleurFilm.title}</h2>
            <button class="play-button"  onclick="ouvrirModal()">Play</button>
            <div class="img-film">
            <img src="${meilleurFilm.image_url}" alt="${meilleurFilm.title}" >
            </div>
          </div>
      </div>
    `;
  })
  .catch(error => console.error(error));



var page = 1;
let allFilms = [];
while (page < 3)
{
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page='+page, {async: false})
      .then(response => response.json())
      .then(data => {
        let topFilms = data.results;
        console.log(topFilms)
        allFilms = allFilms.concat(topFilms);
        if (allFilms.length == 10){
            allFilms = allFilms.slice(1,8);
            console.log(allFilms);
            var element = document.getElementById("top-films-list");
            element.classList.add("active");
            const topFilmsList = document.getElementById('top-films-list');
            allFilms.forEach(film => {
              const filmCard = document.getElementById('film-card');
              filmCard.innerHTML += `
                    <div class="top-film-img">
                        <img src="${film.image_url}" alt="${film.title}" onclick="ouvrirModal()">
              `;
              topFilmsList.appendChild(filmCard);
            });
        }
      })
      .catch(error => console.error(error));
      page++;
}



var page = 1;
let allFilmsGenre = [];
while (page < 3)
{
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Romance&page='+page, {async: false})
      .then(response => response.json())
      .then(data => {
        let topFilmGenre = data.results;
        console.log(topFilmGenre)
        allFilmsGenre = allFilmsGenre.concat(topFilmGenre);
        if (allFilmsGenre.length == 10){
            allFilmsGenre = allFilmsGenre.slice(1,8);
            console.log(allFilmsGenre);
            var element = document.getElementById("top-films-genre");
        if (allFilmsGenre.length >= 4){

            element.classList.add("active");
        } else {

            element.classList.remove("active");
}
            const topFilmGenre = document.getElementById('top-films-genre');
            allFilmsGenre.forEach(film => {
              const filmGenre = document.getElementById('film-category');
              filmGenre.innerHTML += `
                    <div class="top-film-img">
                        <img src="${film.image_url}" alt="${film.title}" onclick="ouvrirModal()">
                    </div>
              `;
              topFilmGenre.appendChild(filmGenre);
            });
        }

      })
      .catch(error => console.error(error));
      page++;
}


var page = 1;
let allFilmsDrama = [];
while (page < 3)
{
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Drama&page='+page, {async: false})
      .then(response => response.json())
      .then(data => {
        let topFilmDrama = data.results;
        console.log(topFilmDrama)
        allFilmsDrama = allFilmsDrama.concat(topFilmDrama);
        if (allFilmsDrama.length == 10){
            allFilmsDrama = allFilmsDrama.slice(1,8);
            console.log(allFilmsDrama);
            var element = document.getElementById("top-films-drama");
        if (allFilmsDrama.length >= 4){

            element.classList.add("active");
        } else {

            element.classList.remove("active");
}

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



var page = 1;
let allFilmsAction = [];
while (page < 3)
{
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action&page='+page, {async: false})
      .then(response => response.json())
      .then(data => {
        let topFilmAction = data.results;
        console.log(topFilmAction)
        allFilmsAction = allFilmsAction.concat(topFilmAction);
        if (allFilmsAction.length == 10){
            allFilmsAction = allFilmsAction.slice(1,8);
            console.log(allFilmsAction);
            var element = document.getElementById("top-films-action");
            element.classList.add("active");

            const topFilmAction = document.getElementById('top-films-action');
            allFilmsAction.forEach(film => {
              const filmAction = document.getElementById('film-action');
              filmAction.innerHTML += `

                    <div class="top-film-img">
                        <img src="${film.image_url}" alt="${film.title}" onclick="ouvrirModal()">
                    </div>
              `;
              topFilmAction.appendChild(filmAction);
            });
        }

      })
      .catch(error => console.error(error));
      page++;
}



// Récupérer la div de la fenêtre modale
const modal = document.getElementById("myModal");

// Récupérer le bouton de lecture
const playBtn = document.querySelector(".play-button");

// Ajouter un événement "click" au bouton de lecture
playBtn.addEventListener("click", ouvrirModal);
// Récupérer le bouton de fermeture
const closeBtn = document.querySelector(".close");

// Ajouter un événement "click" au bouton de fermeture
closeBtn.addEventListener("click", fermerModal);


// Fonction pour ouvrir la fenêtre modale
function ouvrirModal() {
  // Récupérer les informations du film
  const film = {
    titre: "Titre du film",
    genre: "Genre complet du film",
    dateSortie: "Date de sortie",
    rated: "Rated",
    scoreImdb: "Score IMDB",
    realisateur: "Réalisateur",
    acteurs: "Liste des acteurs",
    duree: "Durée",
    pays: "Pays d'origine",
    boxOffice: "Résultat au box office",
    resume: "Résumé du film"
  };

  // Afficher les informations dans la fenêtre modale
  document.getElementById("modal-title").textContent = film.titre;
  document.getElementById("modal-genre").textContent = film.genre;
  document.getElementById("modal-release").textContent = film.dateSortie;
  document.getElementById("modal-rated").textContent = film.rated;
  document.getElementById("modal-imdb").textContent = film.scoreImdb;
  document.getElementById("modal-director").textContent = film.realisateur;
  document.getElementById("modal-actors").textContent = film.acteurs;
  document.getElementById("modal-duration").textContent = film.duree;
  document.getElementById("modal-country").textContent = film.pays;
  document.getElementById("modal-box-office").textContent = film.boxOffice;
  document.getElementById("modal-summary").textContent = film.resume;

  // Afficher la fenêtre modale
  modal.style.display = "block";
}

// Fonction pour fermer la fenêtre modale
function fermerModal() {
  modal.style.display = "none";
}

