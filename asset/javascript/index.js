import {pintarCard, createCheckboxes,filtroCombinado,filtrarPorTexto,filtrarCategoria } from "./function.js"; 
//capturo los contenedores de card, checkbox, y el input del buscador
const contenedor = document.getElementById("contenedor");
const contenedorCheck = document.getElementById("checkboxContainer");
const buscador = document.querySelector(".form-control");

// const fecha = data.currentDate;

// let { events } = data;


let eventosList 

async function getEventos(){
  await fetch('../amazing.json')
      .then(response => response.json())
      .then(data =>{
          eventosList = data.events              
          pintarCard(eventosList, contenedor) 
          createCheckboxes(eventosList, contenedorCheck);
  }).catch(err => console.error(err))
}getEventos()



buscador.addEventListener("input", () => {
  filtroCombinado(eventosList, buscador.value, contenedor)
});

contenedorCheck.addEventListener("change", () => {
  filtroCombinado(eventosList, buscador.value, contenedor)
});













































// import data from "./amazing.js";

// import {drawCard} from "./function.js";

// let contenedor = document.getElementById("contenedor");
// drawCard(data.events, contenedor);
// createChecks(data.events);

// const input = document.querySelector('(".form-control me-2")')

// //funcion que busca por texto
// function textFilter(array, name){
//     let arrFiltered = array.filter(elemento => elemento.name.tolowerCase().includes(name.tolowerCase()))
//     return arrFiltered
// }

// input.addEventListener('input', () =>{
//     let textFiltered = textFilter(data.events, input.value);
//     let categFiltered = categFilter(textFiltered)
//     drawCard(categFiltered, contenedor);
// })
//  const containerCheck = document.getElementById('checkboxContainer')

//  //funcion que filtra las categorias en checkboxes y retorna a un arreglo de eventos filtrados
// function categFilter(eventosCateg){
//     let checkboxes = document.querySelectorAll("input[type='checkbox']")
//     let arrChecks = Array.from(checkboxes)
//     let arrChecksCateg = arrChecks.filter(check => check.checked)
//     let arrChecksCategValues = arrChecksCateg.map(checkChecked => checkChecked.value)
//     let arrFiltrado = eventosCateg.filter(elemento => arrChecksCategValues.includes(elemento.category))
//     if (arrChecksCateg.length > 0) {
//         return arrFiltrado
//     }
//     return eventosCateg
// }   

// containerCheck.addEventListener('change', () => {
//     let textFiltered = textFilter(data.events, input.value);
//     let categFilter = categFilter(textFiltered)
//     drawCard(categFilter, contenedor);

// })


