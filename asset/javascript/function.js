function pintarCard(array, cardsContainer){
    if(array.length == 0){
        cardsContainer.innerHTML = `<h2>Event not found</h2>`
        return
    }
    let tarjetas = ''
    array.forEach(event => {
        tarjetas += `<div class="card card h-200" style="width: 20rem;">
                   <img src=${event.image} class="card-img-top object-fit-cover min-height:2em" alt="...">
                           <div class="card-body">
                              <h5 class="card-title">${event.name}</h5>
                             <p class="card-text">${event.description}</p>
                            </div>
                           <div class="card-footer d-flex justify-content-between gap-1 align-items-center">
                             <p class="align-self-center mt-1">Price $ ${event.price}</p>
                              <p class="card-price align-self-center mt-1"></p>
                             <a href="../../pages/details.html?id=${event._id}" class="btn btn-primary">Details</a>
                           </div>
                           </div>`
    })
    cardsContainer.innerHTML = tarjetas;
} 

function createCheckboxes(array, contenedorCheckbox) {
  //le pido que me pase solo de la data la categoria
  let arrayCards = array.map((data) => data.category);
  //set, coleccion que no permite elementos repetidos, y lo vuelvo a pasar a otro array, le paso el elemento iterable
  //categorias sin repetir
  let setCard = new Set(arrayCards);
  //para pasarlo a formato de array(metodos de orden superior)
  let arrayChecks = Array.from(setCard);
  arrayChecks.sort();
  //string vacio
  let checkboxes = "";
  //por cada categoria voy a hacer checkboxes y le paso el codigo de boostrap
  arrayChecks.forEach((category) => {
    console.log(category)  
    checkboxes += `<div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
      <label class="form-check-label" for="${category}">${category}</label>
    </div>`;
  });
  contenedorCheckbox.innerHTML = checkboxes;
}

function filtroCombinado(eventosList, texto, contenedor){
  let filtroSearch = filtrarPorTexto(eventosList,texto)
  let filtroCheck = filtrarCategoria(filtroSearch)
  pintarCard(filtroCheck, contenedor)
}

function filtrarPorTexto(array,texto){
  let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
  return arrayFiltrado
}

function filtrarCategoria(array){
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  let arrayChecks = Array.from(checkboxes)
  let arrayChecksChecked = arrayChecks.filter(check => check.checked)
  let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value)
  let arrayFiltrado = array.filter(elemento => arrayChecksCheckedValues.includes(elemento.category))
  if(arrayChecksChecked.length > 0){
      return arrayFiltrado
  }
  return array
}




// function lowestPercentageAttendance(array) {
//   let eventsWithLowestAttendance = "";
//   let lowestAttendancePercentage = 101;
//   array.forEach((event) => {
//       const percentage = ((event.assistance ? event.assistance : event.estimate)/ event.capacity) * 100;
//       if (percentage < lowestAttendancePercentage) {
//           lowestAttendancePercentage = percentage;
//           eventsWithLowestAttendance = event.name;
//       } 
//   });
//   return eventsWithLowestAttendance;
// }

// function highestPercentageAttendance(array) {
//   let eventsWithhighestAttendance = "";
//   let highestPercentageAttendance = 50;
//   array.forEach((event) => {
//       const percentage = ((event.assistance ? event.assistance : event.estimate)/ event.capacity) * 100;
//       if (percentage > highestPercentageAttendance) {
//         highestPercentageAttendance = percentage;
//           eventsWithhighestAttendance = event.name;
//       } 
//   });
//   return eventsWithhighestAttendance;
// }

// function categories(array) {
//   let categoriesList = array.map(evento => evento.category);
//   let uniqueCategoriesList = [...new Set(categoriesList)];
//   return uniqueCategoriesList.join(", ");
  
// }

// function revenues(eventosList) {
//   let totalRevenues = 0;
//   for (let evento of eventosList) {
//     for (let ticket of evento.tickets) {
//       totalRevenues += ticket.price * ticket.soldTickets;
//     }
//   }
//   return totalRevenues.toFixed(2);
// }

// function attendance(eventosList) {
//   let totalAttendance = 0;
//   eventosList.forEach(evento => {
//     totalAttendance += evento.asistentes;
//   });
//   return totalAttendance;
// }

//   function calculateProjectedTotalRevenue(eventosList) {
//   let projectedTotalRevenue = 0;
//   for (let evento of eventosList) {
//     for (let ticket of evento.tickets) {
//       const soldTickets = ticket.soldTickets || 0;
//       const price = ticket.price;
//       projectedTotalRevenue += price * soldTickets;
//     }
//   }
//   return `$${projectedTotalRevenue.toFixed(2)}`;
// }

export { pintarCard, createCheckboxes,filtroCombinado,filtrarPorTexto,filtrarCategoria }








































