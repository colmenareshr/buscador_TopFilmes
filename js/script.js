const peliculasTop = async() => {
   
   try {
      const cargarPeli = await fetch('https://api.themoviedb.org/3/movie/popular/?api_key=1c990d8d516c09815cc67448a193cf2c&language=pt-BR');
      //console.log(cargarPeli);

      if(cargarPeli.status === 200){
         const datosPeliculas = await cargarPeli.json();
         console.log(datosPeliculas);


         const buscaForm = document.querySelector('#buscar');
         const resultado = document.querySelector('#peliculas_busqueda');
         const buscarFilme = () =>{
            const valor = buscaForm.value.toLowerCase();
            for (busqueda of results){
               let nombre = busqueda.title.toLowerCase();
               if (nombre.indexOf(valor) !== -1){
                  resultado.inneHTML += `<div>${results.title}</div>`
               }
            }
         }
         // let resultados = "";
         // datosPeliculas.results.foeach(resultado =>{
         //    resultados += `${resultado.title.toLowerCase()}`;
         // });
         // document.getElementById('peliculas_busqueda').innerHTML = resultados;


         let peliculas= ""; 
         datosPeliculas.results.forEach(pelicula => {
            peliculas += `<div class="title_post">
            
            <img class= "poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"
            
            <h3 class= "title_pelicula">${pelicula.title}</h3>
            </div>
            `;
            
         });
         document.getElementById('container_peliculas').innerHTML = peliculas;
   

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