import data from "../javascript/amazing.js";

const fecha = data.currentDate;

let { events } = data;

let future = events.filter(evento=>evento.date>fecha);
console.table(future);

const template = document.querySelector(".plantilla").content; 
const padre = document.querySelector(".card-tod"); 
const fragment = document.createDocumentFragment();

future.forEach((event) => {

template.querySelector(".card-title").textContent = event.name; 
template.querySelector(".card-text").textContent = event.description;
template.querySelector(".card-img-top").src = event.image;
template.querySelector(".card-price").textContent = event.price;

const copia = template.cloneNode(true);
fragment.appendChild(copia);

})

padre.appendChild(fragment);