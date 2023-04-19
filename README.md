<p align="center">
   <img src="/images/logo_blanc.png" alt="JustStreamIt" >
</p> 

# Projet 6: Développez une interface utilisateur pour une application web Python
***

Le projet à pour but de créer une page web en utilisant le Javascript, Html et CSS, et d'importer les données des films  depuis une API.

### Installation :
 Il faut absolument installer et activer locale "OCMovies" :
https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR

et vérifier le fonctionnement de l'api en affichant la page :
http://localhost:8000/api/v1/titles/

### Déscription:
La page web est composé d'une barre de menu, un film en vedette, meilleur film par note imdb qui prend la  réponse de la requete api GET : "?sort_by=-imdb_score&imdb_score_min=9".
et trois bandeaux de films, chacun contenant 4 pages de 7 films pouvant defiler via des boutons flèches gauches et droites. Les bandeaux de films presentent les résultats aux requetes API suivantes :
- "Meilleurs scores ImDb" : "?sort_by=-imdb_score&imdb_score_min=9" (en evitant le premier résultat qui a été isolé pour la vignette meilleur film)
Pour les catégories nous avons le choix de définir n'importe quelle:
- "Meilleurs films d'action": "?sort_by=-imdb_score&genre_contains=Action"





