console.log('funguju!');
// Spusťte si připravenou stránku, prohlédněte index.html a strukturu filmu v seznamu.
// Seznam filmů budeme stahovat z endpointu https://apps.kodim.cz/daweb/trening-api/apis/movie-api/movies, jak vypadá struktura dat, si můžete ověřit otevřením adresy v prohlížeči.
// Napište JavaScriptový kód, který zajistí stažení pole filmů z API. Zatím jej vypište do konzole.

// Někam si zkopírujte strukturu jednoho filmu z index.html. Obsah elementu .movie-list smažte, aby zůstal prázdný.

{/* <li class="movie-detail">
          <div class="movie-poster">
            <img 
              src="https://image.pmgstatic.com/cache/resized/w360/files/images/film/posters/162/505/162505167_735db9.jpg"
              alt="Vykoupení z věznice Shawshank"
            />
          </div>
          <div class="movie-info">
            <h2 class="movie-title">Vykoupení z věznice Shawshank</h2>
            <div class="movie-year">Rok vydání: 1994</div>
            <div class="movie-link">
              <a href="https://www.csfd.cz/film/2294-vykoupeni-z-veznice-shawshank" target="_blank">Odkaz na CSFD</a>
            </div>
          </div>
        </li> */}
// Upravte kód tak, abyste naplnili element .movie-list obsahem staženým z API. 
const naplnElementFilmy = (items)=> {
    const elementFilmy = document.querySelector('.movie-list');
    const filmy = items.map(film =>
    `
    <li class="movie-detail">
          <div class="movie-poster">
            <img src=${film.posterUrl} alt=${film.title}/>
          </div>
          <div class="movie-info">
            <h2 class="movie-title">${film.title}</h2>
            <div class="movie-year">Rok vydání: ${film.year}</div>
            <div class="movie-link">
              <a href=${film.url} target="_blank">Odkaz na CSFD</a>
            </div>
          </div>
        </li> 
    `)
    .join('');
    elementFilmy.innerHTML = filmy;
  }  

  fetch('https://apps.kodim.cz/daweb/trening-api/apis/movie-api/movies')
      .then((response)=>response.json())
      .then((data)=>{
        //console.log(data);
        naplnElementFilmy(data);
      })

// Zakomentujte pro tuto chvíli kód, který z API stahuje jednotlivé filmy. Vrátíme se k němu později.
// Filmové API umožňuje získat názvy všech dostupných žánrů pomocí endpointu /movie-api/genres. Prohlédněte si data, která tento endpoint vrací.
// Pomocí funkce fetch naplňte těmito daty prvek select podle připravenéno vzoru.
const naplnElementZanru = (items) =>{
    const selectGenres = document.querySelector('#select-genre')
    const zanry = items.map(zanr=>
        `
        <option value="${zanr}">${zanr}</option>
    `)
    .join('');
    selectGenres.innerHTML = zanry;
    console.log(zanry)
}
fetch('https://apps.kodim.cz/daweb/trening-api/apis/movie-api/genres')
     .then((response)=>response.json())
      .then((data)=>{
        //console.log(data);
        naplnElementZanru(data);
      })

     
// V dokumentaci k filmovému API si nastudujte, jakým způsobem můžete poslat dotaz na filmy pouze určitého žánru.
// Při odeslání formuláře zobrazte uživateli pouze filmy, které mají vybraný žánr.
   
const formular = document.querySelector('.filters');
formular.addEventListener('submit', (event)=>{
    event.preventDefault();
    const vyberZanru = document.querySelector('#select-genre').value;
    console.log(vyberZanru);
    console.log('https://apps.kodim.cz/daweb/trening-api/apis/movie-api/movies?genre=' + `${vyberZanru}`)
    fetch('https://apps.kodim.cz/daweb/trening-api/apis/movie-api/movies?genre=' + `${vyberZanru}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            naplnElementFilmy(data)
        })

})
