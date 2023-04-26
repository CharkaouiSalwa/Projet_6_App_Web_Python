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
            <button class="play-button" onclick="ouvrirModal('${meilleurFilm.url}')">Play</button>
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
        allFilms = allFilms.concat(topFilms);
        if (allFilms.length == 10){
            allFilms = allFilms.slice(1,8);
            var element = document.getElementById("top-films-list");
            element.classList.add("active");
            const topFilmsList = document.getElementById('top-films-list');
            allFilms.forEach(film => {
              const filmCard = document.getElementById('film-card');
              filmCard.innerHTML += `
                    <div class="top-film-img">
                        <img src="${film.image_url}" alt="${film.title}" onclick="ouvrirModal('${film.url}')" >
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
        allFilmsGenre = allFilmsGenre.concat(topFilmGenre);
        if (allFilmsGenre.length == 10){
            allFilmsGenre = allFilmsGenre.slice(1,8);

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

        allFilmsAction = allFilmsAction.concat(topFilmAction);
        if (allFilmsAction.length == 10){
            allFilmsAction = allFilmsAction.slice(1,8);
            var element = document.getElementById("top-films-action");
            element.classList.add("active");
            const topFilmAction = document.getElementById('top-films-action');

            allFilmsAction.forEach(film => {
              const filmAction = document.getElementById('film-action');
              filmAction.innerHTML += `

                    <div class="top-film-img">
                        <img src="${film.image_url}" alt="${film.title}" onclick="ouvrirModal('${film.url}')">
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
//const playBtn = document.querySelector(".play-button");

// Ajouter un événement "click" au bouton de lecture
//playBtn.addEventListener("click", ouvrirModal);
// Récupérer le bouton de fermeture
const closeBtn = document.querySelector(".close");

// Ajouter un événement "click" au bouton de fermeture
closeBtn.addEventListener("click", fermerModal);


// Fonction pour ouvrir la fenêtre modale

function testouvrirModal(){
  // Récupérer les informations du film
   var modal = document.getElementById("myModal");
  // Récupération des données depuis l'API
  fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
  .then(response=> response.json())
  .then(dataurl=> {
   var myurl = dataurl.results[0].url;
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
  })
   // Affichage du modal
  modal.style.display = "block";
}

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


const carouselItems = document.querySelector(".carousel-items");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const carouselItemWidth = document.querySelector(".carousel-item").offsetWidth;
const totalCarouselItems = 7;
let currentCarouselItem = 0;

prevBtn.addEventListener("click", () => {
  if (currentCarouselItem > 0) {
    currentCarouselItem--;
    carouselItems.style.transform = `translateX(-${currentCarouselItem * carouselItemWidth}px)`;
  }
});

nextBtn.addEventListener("click", () => {
  if (currentCarouselItem < totalCarouselItems - 1) {
    currentCarouselItem++;
    carouselItems.style.transform = `translateX(-${currentCarouselItem * carouselItemWidth}px)`;
  }
});
