const peliculasTop = async() => {
   
   try {
         const cargarPeli = await fetch('https://api.themoviedb.org/3/movie/popular/?api_key=1c990d8d516c09815cc67448a193cf2c&language=pt-BR');

      if(cargarPeli.status === 200){
         const datosPeliculas = await cargarPeli.json();
         console.log(datosPeliculas);
         let peliculas= ""; 
         datosPeliculas.results.forEach(pelicula => {
            peliculas += `<div class="title_post">
            
            <img class= "poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"
            
            <h3 class= "title_pelicula">${pelicula.title}</h3>
            <div class="vote">
            <p> Rate: ${pelicula.vote_average} </p>
            <p> Votes: ${pelicula.vote_count} </p>
            </div>
            </div>
            `;
            
         });
         document.getElementById('container_peliculas').innerHTML = peliculas;

const d = document;
$peliculas = d.getElementById('peliculas');
$template = d.getElementById('peliculas_template').content
$fragment = d.createDocumentFragment();

d.addEventListener('keypress', async e =>{
   if(e.target.matches('#search')){
      if(e.key === 'Enter'){
         try {
            let busqueda = e.target.value.toLowerCase();
               api = `https://api.themoviedb.org/3/search/movie?api_key=1c990d8d516c09815cc67448a193cf2c&language=pt-BR&query=${busqueda}`,
               res = await fetch(api),
               json = await res.json();
               console.log(api, res, json);

               if(!res.ok) throw {status: res.status, statusText: res.statusText}
               
               if(json.results.length === 0){
                  $peliculas.innerHTML = `<h2>No se encontraron resultados para: ${busqueda}</h2>`
               }else{
                  json.results.forEach(el =>{
                     $template.querySelector('img').src = `https://image.tmdb.org/t/p/w500/${el.poster_path}`;
                     $template.querySelector('img').alt = el.title;
                     $template.querySelector('h3').textContent = el.title;

                     let $clone = d.importNode($template, true);
                     $fragment.appendChild($clone);
                  })
                  document.querySelector('#container_peliculas').replaceChildren($fragment);
               }
         } catch (error) {
            console.log(error);
            let mensajeError = error.statusText || "Error, película no encontrada"
            $peliculas.innerHTML= `<p>Error ${error.status}: ${mensajeError}</p>` 
         }
      }
   }
})
      }else if(cargarPeli.status === 401){
         console.log("status 1");
      }else if(cargarPeli.status === 404){
         console.log("Respuesta 2");
      }else{
         console.log("Respuesta 3");
      }

   } catch (error) {
      console.log(error);
   }
}
peliculasTop();