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







































