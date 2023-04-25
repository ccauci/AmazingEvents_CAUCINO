//cambie data por fecha

let fecha;
let eventosList;
async function getEventos(){
  await fetch('../amazing.json')
  .then (response => response.json()) 
  .then (data =>{ 
    eventosList = data.events 
    fecha = data.currentDate
    showStatistics(eventosList),
    showUpcomingStatisticsCategory(eventosList),
    showPastStatistics(eventosList)
})
} getEventos()

// función para mostrar las estadísticas relacionadas con la lista de eventos
function showStatistics(eventosList) {
  let table = document.getElementById("tableEvents");
  let tbody = table.querySelector("tbody");
  let row = "";
  row = `
<tr>
  <th width="308">
  ${highestPercentageAtlendance(eventosList)}
  </th>
  <th width="308">${lowestPercentageAtlendance(eventosList)}</th>
  <th width="308">${largerCapacity(eventosList)}</th>
</tr>`;
  tbody.innerHTML = row;
  
}

//funcion que toma la lista de eventos y devuelve una cadena con el nombre del evento de mayor porcentaje de asistencia
function highestPercentageAtlendance(eventosList) {
  let maxPercentage = Math.max(...(eventosList).map(events => ((events.assistance || events.estimate) / events.capacity) * 100));
  console.log(maxPercentage)
  let events = (eventosList).find(events => ((events.assistance || events.estimate) / events.capacity) * 100 == maxPercentage);
  return events.name;
}

//funcion que toma la lista de eventos y devuelve una cadena con el nombre del evento de menor porcentaje de asistencia
function lowestPercentageAtlendance(eventosList){
  let minPercentage = Math.min(...(eventosList).map(events => ((events.assistance || events.estimate) / events.capacity)*100));
  console.log(minPercentage);
  let events = (eventosList).find(events =>((events.assistance || events.estimate)/ events.capacity)*100 ==minPercentage);
  return events.name;
}

//Events with larger capacity
function largerCapacity(){
  let maxCapacity = Math.max(...eventosList.map(events => events.capacity))
  let events = eventosList.find(events => events.capacity == maxCapacity)
  return events.name ;
}
/*******************************************************************************/

//funcion de estadísticas de upcommingEvents por categoría
function upcomingEvent(eventosList, data) {
  let eventos = []
  eventosList.forEach((event) => {
    if (data < event.date) {
      eventos.push(event)
    }
  });
  return eventos;
 
} 

function showUpcomingStatisticsCategory(eventosList){
  let table = document.getElementById("tableUpcoming");
  let tbody = table.querySelector("tbody");
  let categories = eventosList.map(evento => evento.category)
  let categoria = new Set(categories)
  let categorias = Array.from(categoria)
  let row = "";
  categorias.forEach(category => {
    let revenue = revenuesCategories(eventosList,category,data, "upcoming");
    if (revenue > 0 && !isNaN(revenue)) {
    row += `<tr>
    <th width="308">${(category)}</th>
    <th width="308">$${revenuesCategories(eventosList,category,data, "upcoming")}</th>
    <th width="308">${percentageOfAttendance(eventosList,category,data, "upcoming")}%</th>
  </tr>`;
    }
  });
  
  tbody.innerHTML = row;
} 

//funcion de estadisticas de Past Events por categoria
function pastEvent(eventosList, data) {
  let eventos = []
  eventosList.forEach((event) => {
    if (data > event.date) {
      eventos.push(event)
    }
  });
  return eventos;
}

function showPastStatistics(eventosList) {
  let table = document.getElementById("tablePast")
  let tbody = table.querySelector("tbody");
  let categories = eventosList.map(evento => evento.category)
  let categoria = new Set(categories)
  let categorias = Array.from(categoria)
  let row = "";
  categorias.forEach(category => {
    row += `<tr>
    <th width="308">${category}</th>
    <th width="308">$${revenuesCategories(eventosList, category, data, "past")}</th>
    <th width="308">${percentageOfAttendance(eventosList, category,data, "past")}%</th>
  </tr>`;
      
  })
  tbody.innerHTML = row;
}

//	Revenues by categories, calcula los ingresos generados por eventos en una categoría particular, ya sea en el pasado o en el futuro, según el valor de tipoEvento.
function revenuesCategories(eventosList, category, data, tipoEvento){
  let eventos;
  if(tipoEvento === "past"){
    eventos = pastEvent(eventosList, data);
  } else if((tipoEvento === "upcoming")){
    eventos = upcomingEvent(eventosList, data);
  } else {
    return "Error: Invalid date"
  
  }

let filteredEvents  = eventos.filter(eventosList => eventosList.category === category);  
let revenues = filteredEvents.reduce((total, events) => {
  return total + ((events.assistance ? events.assistance : events.estimate) * events.price)
}, 0);
  return revenues; 
} 

//Percentage of attendance by category, calcula el porcentaje de asistencia a eventos en una categoría particular, ya sea en el pasado o en el futuro, según el valor de tipoEvento.
function percentageOfAttendance(eventosList, category, data, tipoEvento){
  let eventos;
  if(tipoEvento === "past"){
    eventos = pastEvent(eventosList, data);
  } else if((tipoEvento === "upcoming")){
    eventos = upcomingEvent(eventosList, data);
  } else {
    return "Error: Invalid date"
  }

let filteredEvents  = eventos.filter(events => events.category === category);
let totalAssistance = filteredEvents.reduce((accumulator, events) => accumulator + (events.assistance ? events.assistance : events.estimate), 0);
let totalCapacity = filteredEvents.reduce((accumulator, events) => accumulator + events.capacity, 0);
let percentage = (totalAssistance / totalCapacity) * 100;

return percentage.toFixed(2);
}




















// import {
//   lowestPercentageAttendance,
//   highestPercentageAttendance,
//   categories,
//   revenues,
//   attendance, calculateProjectedTotalRevenue
// } from "./function.js";

// let eventosList = [];

// function largestCapacity(array) {
//   let eventWithLargestCapacity = array.reduce((prevEvent, actualEvent) => {
//     return prevEvent.capacity > actualEvent.capacity ? prevEvent : actualEvent;
//   }).name;
//   return eventWithLargestCapacity;
// }

// function showAttendanceStatistics(array) {
//   let table1 = document.getElementById("tabla1");
//   let row = document.createElement("tr");
//   row = `
//   <th width="308">${highestPercentageAttendance(array)}</th>
//   <th width="308">${lowestPercentageAttendance(array)}</th>
//   <th width="308">${largestCapacity(array)}</th>`;
//   table1.innerHTML = row;
// }

// function showRevenueStatistics(array) {
//   let table2 = document.getElementById("tabla2");
//   let row = document.createElement("tr");
//   row = `          
//   <th width="308">${categories(array)}</th>
//   <th width="308">${revenues(array)}</th>
//   <th width="308">${attendance(array)}</th>`;
//   table2.innerHTML = row;
// }

// async function getEventos() {
//   await fetch("../amazing.json")
//     .then((response) => response.json())
//     .then((data) => {
//       eventosList = data.events;
//       console.log(eventosList);
//       showAttendanceStatistics(eventosList);
//       console.log(eventosList);
//       showRevenueStatistics(array);
//       calculateProjectedTotalRevenue(array);
//     });
// }
// getEventos();
