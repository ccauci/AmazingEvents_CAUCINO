let eventosList = [];

async function getEventos(){
    await fetch('../amazing.json')
        .then(response => response.json())
        .then(data =>{
            eventosList = data.events   
            console.log(eventosList); 
            showAttendanceStatistics(eventosList);
            showRevenueStatistics(eventosList); 
    })
}

function highestPercentageAttendance(eventosList) {
  let highest = eventosList[0];
  let highestPercentage = calculatorPercentageAttendance(eventosList[0]);

  for(let i=1; i<eventosList.length; i++) {
    let percentage = calculatorPercentageAttendance(eventosList[i]);

    if(percentage > highestPercentage) {
      highest = eventosList[i];
      highestPercentage = percentage;
    }
  }

  return `${highest.name} (${highestPercentage}%)`;
}

function lowestPercentageAttendance(eventosList) {
  let lowest = eventosList[0];
  let lowestPercentage = calculatorPercentageAttendance(eventosList[0]);

  for(let i=1; i<eventosList.length; i++) {
    let percentage = calculatorPercentageAttendance(eventosList[i]);

    if(percentage < lowestPercentage) {
      lowest = eventosList[i];
      lowestPercentage = percentage;
    }
  }

  return `${lowest.name} (${lowestPercentage}%)`;
}

function largestCapacity(eventosList) {
  let largest = eventosList[0];

  for(let i=1; i<eventosList.length; i++) {
    if(eventosList[i].capacity > largest.capacity) {
      largest = eventosList[i];
    }
  }

  return `${largest.name} (${largest.capacity} personas)`;
}

function categories(eventosList) {
  let categoriesList = eventosList.map(evento => evento.category);
  let uniqueCategoriesList = [...new Set(categoriesList)];
  return uniqueCategoriesList.join(", ");
}

function revenues(eventosList) {
  let totalRevenues = 0;
  for (let evento of eventosList) {
    for (let ticket of evento.tickets) {
      totalRevenues += ticket.price * ticket.soldTickets;
    }
  }
  return `$${totalRevenues.toFixed(2)}`;
}

function attendance(eventosList) {
  let totalAttendance = 0;
  eventosList.forEach(evento => {
    totalAttendance += evento.asistentes;
  });
  return totalAttendance;
}

function showAttendanceStatistics() {
  let table = document.getElementById("tableEvents");
  let tbody = table.querySelector("tbody");
  let row = "";
  row = `<tr>
  <td width="308">${highestPercentageAttendance(eventosList)}</td>
  <td width="308">${lowestPercentageAttendance(eventosList)}</td>
  <td width="308">${largestCapacity(eventosList)}</td>
</tr>`;
  tbody.innerHTML = row;
}


function showRevenueStatistics() {
  let table = document.getElementById("tableEvents");
  let tbody = table.querySelector("tbody");
  let row = "";
  row = `<tr>          
  <td width="308">${categories(eventosList)}</td>
  <td width="308">${revenues(eventosList)}</td>
  <td width="308">${attendance(eventosList)}</td>
</tr>`;
  tbody.innerHTML = row;
}


function calculatorPercentageAttendance(array){
  let attendance = 0;
  let capacity = 0;
  array.forEach(evento => {
    capacity += evento.capacity;
    attendance += evento.assistance ? evento.assistance : evento.estimate;
  });
  return ((attendance/capacity) * 100).toFixed(2);
}




// Obtener los eventos al cargar la página
window.addEventListener('load', () => {
  getEventos().then(eventosList => {
    // Los datos han sido obtenidos, mostrarlos en la interfaz
    showAttendanceStatistics(eventosList);
    showRevenueStatistics(eventosList);
  })
});












// window.onload = function() {
//   let table = document.getElementById("tableEvents");
//   let html = "<tr><td>Dato 1</td><td>Dato 2</td></tr>";
//   table.innerHTML = html;
// };





















































//   export function calculator PercentageAttendance(array){

//     Let attendance = 0;
    
//     Let capacity = 0;
    
//     array.forEach(event => {
    
//     capacity + event.capacity;
    
//     attendance += event.assistance ? event.assistance: event.estimate
    
//     return ((attendance/capacity) *100).toFixed(2);
//  }


// //Event with the highest percentage of attendance
// function highestAttendace(list){
//   let maxAttendace = Math.max(...(list).map(evento => ((evento.assistance  evento.estimate) / evento.capacity) * 100));
//   let evento = (list).find(evento => ((evento.assistance  evento.estimate) / evento.capacity) * 100 == maxAttendace);
//   return evento.name + ' (' + maxAttendace + '%)';
// }


























// const tbody1 = document.getElementById('tbody1') table.queryselector tbody, celdas vacias adentro crea los td, llamar a cada funcion, mayor por asiste, menor  
// const tbody2 = document.getElementById('tbody2')
// const tbody3 = document.getElementById('tbody3'); 

// async function getEventos(){
//     await fetch('../amazing.json')
//         .then(response => response.json())
//         .then(data =>{
//             eventosList = data.events    
//             dibujarTR(tablaUno(eventosList), tbody1);  

//               let generos = sacarGeneros(animeList)
//               let animesXgenero = sacarAnimesXgenero(animeList, generos)
//               let animesXnombresDeGenero = parearGeneroConAnimes(generos, animesXgenero)
//               tablaDos(generos, animesXnombresDeGenero)
//               dibujarTR(tablaDos(animeList, generos), tbody2)  solo para mostrar las otrs funciones     
//             
//     }).catch(err => console.error(err))
//   }getEventos()


 //   export function calculator PercentageAttendance(array){

//     Let attendance = 0;
    
//     Let capacity = 0;
    
//     array.forEach(event => {
    
//     capacity + event.capacity;
    
//     attendance += event.assistance ? event.assistance: event.estimate
    
//     return ((attendance/capacity) *100).toFixed(2);
//  }








//   function tablaUno(array) {
//       let animeViejo = array.sort((a, b) => a.year - b.year)[0].title
//       let animeNuevo = array.sort((a, b) => b.year - a.year)[0].title
//       let aMenosEpisodios = array.reduce((prev, current) => (prev.episodes < current.episodes) ? prev : current).title
//       let aMasEpisodios = array.reduce((prev, current) => (prev.episodes > current.episodes) ? prev : current).title
  
//       let resultado = {
//           animeMasViejo: animeViejo,
//           animeMasNuevo: animeNuevo,
//           animeConMenosEpisodios: aMenosEpisodios,
//           animeConMasEpisodios: aMasEpisodios,
//       }
//       return resultado
//   }
  
//   // Crear array de géneros tomando los datos del json.
//   function sacarGeneros(array) {
//       return [...new Set((array.map(item => item.genre).flat()).map(item => item.toLowerCase()))]
//   }
  
//   // Identificar qué animé se corresponde con cada género.
//   function sacarAnimesXgenero(arrayAnimes, arrayGeneros) {
//       return animesXgenero = arrayGeneros.map(genero =>
//           arrayAnimes.filter(anime => anime.genre[0].toLowerCase() === genero)
//       );
//   }
  
//   // Crear un objeto que organice en clave-valor los géneros con los animés. Sirve para poder usar el generador de tablas de Cinthya.
//   function parearGeneroConAnimes(arrayGeneros, animesXgenero) {
//       let animesXnombresDeGenero = {};
//       arrayGeneros.forEach((genero, index) => {
//           animesXnombresDeGenero[genero] = animesXgenero[index];
//       });
//       return animesXnombresDeGenero;
//   }
  
//   // Para cada par clave-valor, crear una nueva línea en la tablaDos, sólo cuando el array del valor contenga elementos.
//   function tablaDos(arrayGeneros, parearGeneroConAnimes) {
//       for (let i = 0; i < arrayGeneros.length; i++) {
//           let genero = arrayGeneros[i];
//           let animes = parearGeneroConAnimes[genero];
  
//           if (animes.length > 0) {
//               let row = {
//                   Genre: genero,
//                   Anime: animes.map(anime => anime.title).join(", ")
//               };
//               dibujarTR(row, tbody2);
//           }
//       }
//   }
  
  
//   function dibujarTR(datos, container) {
//       let tr = document.createElement("tr")
//       for (let clave in datos) {
//           // console.log(datos[clave])
//           let td = document.createElement("td")
//           td.innerText = datos[clave]
//           tr.appendChild(td)
//       }
//       container.appendChild(tr)
//   }
  


// function showStatistics(eventsList) {
//   let table = document.getElementById("tableEvents");
//   let tbody = table.querySelector("tbody");
//   let row = "";
//   row = `<tr>
//     <td>${highestPercentageAtlendance(eventsList)}</td>
//     <td>${lowestPercentageAtlendance(eventsList)}</td>
//     <td>${largerCapacity(eventsList)}</td>
//   </tr>`;
//   tbody.innerHTML = row;
  
// }









