import data from "./amazing.js";

import {drawCard} from "./function.js";

let contenedor = document.getElementById("contenedor");
drawCard(data.events, contenedor);
createChecks(data.events);

const input = document.querySelector('(".form-control me-2")')

//funcion que busca por texto
function textFilter(array, name){
    let arrFiltered = array.filter(elemento => elemento.name.tolowerCase().includes(name.tolowerCase()))
    return arrFiltered
}

input.addEventListener('input', () =>{
    let textFiltered = textFilter(data.events, input.value);
    let categFiltered = categFilter(textFiltered)
    drawCard(categFiltered, contenedor);
})
 const containerCheck = document.getElementById('checkboxContainer')

 //funcion que filtra las categorias en checkboxes y retorna a un arreglo de eventos filtrados
function categFilter(eventosCateg){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrChecks = Array.from(checkboxes)
    let arrChecksCateg = arrChecks.filter(check => check.checked)
    let arrChecksCategValues = arrChecksCateg.map(checkChecked => checkChecked.value)
    let arrFiltrado = eventosCateg.filter(elemento => arrChecksCategValues.includes(elemento.category))
    if (arrChecksCateg.length > 0) {
        return arrFiltrado
    }
    return eventosCateg
}   

containerCheck.addEventListener('change', () => {
    let textFiltered = textFilter(data.events, input.value);
    let categFilter = categFilter(textFiltered)
    drawCard(categFilter, contenedor);

})


